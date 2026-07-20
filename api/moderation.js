const crypto = require("crypto");

const COOLDOWN_SECONDS = 45;
const MAX_TEXT_LENGTH = 5000;
const MAX_TOPIC_LENGTH = 80;
const MAX_REQUEST_BYTES = 12000;
const MAX_REPLIES_PER_OPINION = 500;
const AUTO_HIDE_REPORT_THRESHOLD = 3;
const blockedLinkPattern = /(?:https?:\/\/|www\.|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/|\b))/i;
const allowedOriginPattern = /^https?:\/\/(localhost(:\d+)?|127\.0\.0\.1(:\d+)?|quieroopinar\.com\.ar|www\.quieroopinar\.com\.ar|quiero-opinar\.vercel\.app)$/i;
const reportReasons = new Set(["odio", "amenaza", "datos_personales", "spam", "sexual", "ilegal", "acoso", "otro"]);
const hardBlockTerms = [
  "matarte",
  "te voy a matar",
  "direccion de",
  "dni",
  "telefono",
  "tarjeta de credito",
  "pornografia infantil"
];
const reviewTerms = [
  "matar",
  "amenaza",
  "violacion",
  "menor",
  "dox",
  "doxxing",
  "nazi",
  "terrorismo",
  "suicidio"
];

const firebaseConfig = {
  apiKey: "AIzaSyC6oeHuseHtzGqzcprjex6G7ZnAb-8Qrdk",
  authDomain: "quiero-opinar-app.firebaseapp.com",
  projectId: "quiero-opinar-app",
  storageBucket: "quiero-opinar-app.firebasestorage.app",
  messagingSenderId: "710295640299",
  appId: "1:710295640299:web:675b93766a67abad6b06ae",
  measurementId: "G-7CNXRH502G"
};

let contextPromise = null;
const previewCooldowns = new Map();
const previewActions = new Set();

function getRequestIp(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  const realIp = request.headers["x-real-ip"];
  const vercelIp = request.headers["x-vercel-forwarded-for"];
  const cfIp = request.headers["cf-connecting-ip"];
  const candidates = [forwardedFor, realIp, vercelIp, cfIp, request.ip, request.socket?.remoteAddress];
  const raw = candidates.find(Boolean) || "";
  return String(raw).split(",")[0].trim();
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function hashIp(ip) {
  const salt = process.env.IP_HASH_SALT || "quiero-opinar-preview";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function hashKey(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function reject(response, status, code, message, extra = {}) {
  response.status(status).json({ ok: false, code, message, ...extra });
}

function setSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Cache-Control", "no-store");
}

function isAllowedRequestOrigin(request) {
  const origin = request.headers.origin;
  const referer = request.headers.referer;
  const source = origin || referer;
  if (!source) return true;

  try {
    const url = new URL(source);
    return allowedOriginPattern.test(url.origin);
  } catch {
    return false;
  }
}

function hasValidRequestSize(request) {
  const contentLength = Number(request.headers["content-length"] || 0);
  return !contentLength || contentLength <= MAX_REQUEST_BYTES;
}

function validateText(text) {
  return typeof text === "string" &&
    text.trim().length > 0 &&
    text.trim().length <= MAX_TEXT_LENGTH &&
    !blockedLinkPattern.test(text);
}

function validateTopic(topic) {
  return typeof topic === "string" &&
    topic.trim().length > 0 &&
    topic.trim().length <= MAX_TOPIC_LENGTH &&
    !blockedLinkPattern.test(topic);
}

function normalizeModerationStatus(value, hidden = false) {
  if (["pending", "approved", "reported", "hidden", "deleted"].includes(value)) return value;
  return hidden ? "hidden" : "approved";
}

function normalizeReportReason(value) {
  const reason = String(value || "otro").trim();
  return reportReasons.has(reason) ? reason : "otro";
}

function normalizeForModeration(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function assessContentSafety(...values) {
  const text = normalizeForModeration(values.join(" "));
  if (hardBlockTerms.some((term) => text.includes(normalizeForModeration(term)))) {
    return { action: "block", reason: "bloqueado_por_seguridad" };
  }
  if (reviewTerms.some((term) => text.includes(normalizeForModeration(term)))) {
    return { action: "review", reason: "revision_preventiva" };
  }
  return { action: "allow", reason: "" };
}

function normalizeContentType(value) {
  return value === "reply" ? "reply" : "opinion";
}

function normalizeDateValue(value) {
  if (value?.toDate) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return new Date().toISOString();
}

function sanitizeReply(reply) {
  return {
    id: reply?.id || createId("reply"),
    author: reply?.author || "Opinion",
    text: reply?.text || "",
    likes: Number(reply?.likes || 0),
    reports: Number(reply?.reports || 0),
    reportReasons: Array.isArray(reply?.reportReasons) ? reply.reportReasons : [],
    moderationStatus: normalizeModerationStatus(reply?.moderationStatus),
    createdAt: normalizeDateValue(reply?.createdAt)
  };
}

function sanitizeOpinion(doc) {
  return {
    id: doc.id,
    author: doc.author || "Opinion",
    topic: doc.topic || "sin-tema",
    text: doc.text || "",
    views: Number(doc.views || 0),
    likes: Number(doc.likes || 0),
    createdAt: normalizeDateValue(doc.createdAt),
    replies: Array.isArray(doc.replies) ? doc.replies.map(sanitizeReply) : [],
    hidden: Boolean(doc.hidden),
    moderationStatus: normalizeModerationStatus(doc.moderationStatus, Boolean(doc.hidden)),
    moderationReason: doc.moderationReason || "",
    reportReasons: Array.isArray(doc.reportReasons) ? doc.reportReasons : [],
    reports: Number(doc.reports || 0),
    shares: Number(doc.shares || 0),
    ip: ""
  };
}

async function createAdminContext() {
  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID || "quiero-opinar-app";
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (serviceAccountJson) {
      admin.initializeApp({ credential: admin.credential.cert(JSON.parse(serviceAccountJson)) });
    } else if (clientEmail && privateKey) {
      admin.initializeApp({ credential: admin.credential.cert({ projectId, clientEmail, privateKey }) });
    } else {
      throw new Error("missing_admin_credentials");
    }
  }

  const db = admin.firestore();
  return {
    mode: "admin",
    timestamp: () => admin.firestore.FieldValue.serverTimestamp(),
    doc: (collectionName, id) => db.collection(collectionName).doc(id),
    get: (ref) => ref.get(),
    set: (ref, data, options) => ref.set(data, options),
    delete: (ref) => ref.delete(),
    runTransaction: (callback) => db.runTransaction(callback)
  };
}

async function createClientContext() {
  const [{ initializeApp, getApps }, authModule, firestore] = await Promise.all([
    import("firebase/app"),
    import("firebase/auth"),
    import("firebase/firestore")
  ]);
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const auth = authModule.getAuth(app);
  if (!auth.currentUser) await authModule.signInAnonymously(auth);
  const db = firestore.getFirestore(app);

  return {
    mode: "client",
    timestamp: firestore.serverTimestamp,
    doc: (collectionName, id) => firestore.doc(db, collectionName, id),
    get: (ref) => firestore.getDoc(ref),
    set: (ref, data, options) => firestore.setDoc(ref, data, options),
    delete: (ref) => firestore.deleteDoc(ref),
    runTransaction: (callback) => firestore.runTransaction(db, callback)
  };
}

async function getContext() {
  if (!contextPromise) {
    contextPromise = createAdminContext().catch((error) => {
      if (error.message !== "missing_admin_credentials") throw error;
      console.warn("Firebase Admin credentials missing. Falling back to Firebase client auth for preview.");
      return createClientContext();
    });
  }
  return contextPromise;
}

function snapshotExists(snapshot) {
  return typeof snapshot.exists === "function" ? snapshot.exists() : snapshot.exists;
}

function snapshotData(snapshot) {
  return typeof snapshot.data === "function" ? snapshot.data() : snapshot.data;
}

async function getOpinion(ctx, opinionId) {
  const ref = ctx.doc("opinions", opinionId);
  const snapshot = await ctx.get(ref);
  if (!snapshotExists(snapshot)) return null;
  const raw = snapshotData(snapshot);
  const data = sanitizeOpinion({ id: snapshot.id, ...raw });
  data.privateIp = raw.ip || "";
  return { ref, data };
}

async function assertPublishCooldown(ctx, ipHash) {
  if (ctx.mode === "client") {
    const now = Date.now();
    const lastPublishedAt = previewCooldowns.get(ipHash) || 0;
    const elapsedSeconds = Math.floor((now - lastPublishedAt) / 1000);
    if (elapsedSeconds < COOLDOWN_SECONDS) return COOLDOWN_SECONDS - elapsedSeconds;
    previewCooldowns.set(ipHash, now);
    return 0;
  }

  const ref = ctx.doc("securityCooldowns", ipHash);
  const now = Date.now();
  let remainingSeconds = 0;

  await ctx.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (snapshotExists(snapshot)) {
      const lastPublishedAt = snapshotData(snapshot).lastPublishedAt?.toMillis?.() || 0;
      const elapsedSeconds = Math.floor((now - lastPublishedAt) / 1000);
      if (elapsedSeconds < COOLDOWN_SECONDS) {
        remainingSeconds = COOLDOWN_SECONDS - elapsedSeconds;
        return;
      }
    }

    transaction.set(ref, {
      ipHash,
      lastPublishedAt: ctx.timestamp()
    }, { merge: true });
  });

  return remainingSeconds;
}

async function createOpinion(ctx, body, ipHash, response) {
  const text = String(body.text || "").trim();
  const topic = String(body.topic || "sin-tema").trim() || "sin-tema";
  const topicText = String(body.topicText || "").trim();
  const topicRecord = body.topicRecord && typeof body.topicRecord === "object" ? body.topicRecord : null;

  if (!validateText(text) || !validateTopic(topic) || (topicText && !validateTopic(topicText))) {
    return reject(response, 400, "invalid_text", "No se pueden publicar links en opiniones ni respuestas.");
  }

  const safety = assessContentSafety(text, topicText, topic);
  if (safety.action === "block") {
    return reject(response, 400, "unsafe_text", "No se puede publicar contenido con datos sensibles, amenazas o material prohibido.");
  }

  if (topicRecord) {
    const topicName = String(topicRecord.name || "").trim();
    const topicDescription = String(topicRecord.description || "Tema creado por la comunidad").trim();
    const topicIcon = String(topicRecord.icon || "assets/icons/generic.svg").trim();
    const validTopicRecord = topicRecord.id === topic &&
      validateTopic(topicName) &&
      topicDescription.length > 0 &&
      topicDescription.length <= 180 &&
      topicIcon.startsWith("assets/icons/") &&
      topicIcon.endsWith(".svg");

    if (!validTopicRecord) {
      return reject(response, 400, "invalid_topic", "El tema enviado no es valido.");
    }
  }

  const remainingSeconds = await assertPublishCooldown(ctx, ipHash);
  if (remainingSeconds > 0) {
    return reject(response, 429, "publish_cooldown", "Espera unos segundos antes de volver a publicar.", { remainingSeconds });
  }

  const opinion = {
    id: createId("opinion"),
    author: createId("anonimo"),
    topic,
    text,
    views: 1,
    likes: 0,
    createdAt: new Date().toISOString(),
    replies: [],
    hidden: safety.action === "review",
    moderationStatus: safety.action === "review" ? "pending" : "approved",
    moderationReason: safety.reason,
    reportReasons: [],
    reports: 0,
    shares: 0,
    ip: ipHash
  };

  await ctx.set(ctx.doc("opinions", opinion.id), opinion);
  if (topicRecord && topic !== "todos") {
    await ctx.set(ctx.doc("topics", topic), {
      id: topic,
      name: String(topicRecord.name || "").trim(),
      description: String(topicRecord.description || "Tema creado por la comunidad").trim(),
      icon: String(topicRecord.icon || "assets/icons/generic.svg").trim()
    }, { merge: true });
  }
  response.status(201).json({ ok: true, opinion: sanitizeOpinion(opinion), mode: ctx.mode });
}

async function createReply(ctx, body, ipHash, response) {
  const opinionId = String(body.opinionId || "").trim();
  const text = String(body.text || "").trim();
  if (!opinionId || !validateText(text)) {
    return reject(response, 400, "invalid_text", "No se pueden publicar links en opiniones ni respuestas.");
  }

  const safety = assessContentSafety(text);
  if (safety.action === "block") {
    return reject(response, 400, "unsafe_text", "No se puede publicar contenido con datos sensibles, amenazas o material prohibido.");
  }

  const opinionRecord = await getOpinion(ctx, opinionId);
  if (!opinionRecord || opinionRecord.data.hidden) {
    return reject(response, 404, "not_found", "No se encontro la opinion.");
  }

  const remainingSeconds = await assertPublishCooldown(ctx, ipHash);
  if (remainingSeconds > 0) {
    return reject(response, 429, "publish_cooldown", "Espera unos segundos antes de volver a publicar.", { remainingSeconds });
  }

  const opinion = opinionRecord.data;
  if (opinion.replies.length >= MAX_REPLIES_PER_OPINION) {
    return reject(response, 429, "reply_limit", "Esta opinion ya alcanzo el limite de respuestas.");
  }

  opinion.replies.push({
    id: createId("reply"),
    author: "Opinion",
    text,
    likes: 0,
    reports: 0,
    reportReasons: [],
    moderationStatus: safety.action === "review" ? "pending" : "approved",
    createdAt: new Date().toISOString()
  });
  if (safety.action === "review") {
    opinion.hidden = true;
    opinion.moderationStatus = "pending";
    opinion.moderationReason = safety.reason;
  }
  opinion.views += 1;

  const persistedOpinion = { ...opinion, ip: opinion.privateIp || "" };
  delete persistedOpinion.privateIp;
  await ctx.set(opinionRecord.ref, persistedOpinion, { merge: true });
  response.status(201).json({ ok: true, opinion: sanitizeOpinion(persistedOpinion), mode: ctx.mode });
}

async function registerContentAction(ctx, body, ipHash, response) {
  const action = body.action === "report" ? "report" : "like";
  const contentType = normalizeContentType(body.contentType);
  const opinionId = String(body.opinionId || body.contentId || "").trim();
  const contentId = String(body.contentId || opinionId).trim();
  const reportReason = normalizeReportReason(body.reason);

  if (!opinionId || !contentId) {
    return reject(response, 400, "invalid_content", "Contenido invalido.");
  }

  const opinionRef = ctx.doc("opinions", opinionId);
  const actionId = hashKey(`${ipHash}:${action}:${contentType}:${contentId}`);
  const actionRef = ctx.doc("securityActions", actionId);
  let updatedOpinion = null;
  let active = true;

  if (ctx.mode === "client" && action === "report" && previewActions.has(actionId)) {
    return reject(response, 409, "already_reported", "Ya reportaste este contenido.");
  }

  await ctx.runTransaction(async (transaction) => {
    let duplicate = false;
    if (ctx.mode !== "client") {
      const duplicateSnapshot = await transaction.get(actionRef);
      duplicate = snapshotExists(duplicateSnapshot);
      if (duplicate && action === "report") {
        throw new Error("already_reported");
      }
    } else if (previewActions.has(actionId)) {
      duplicate = true;
    }

    const opinionSnapshot = await transaction.get(opinionRef);
    if (!snapshotExists(opinionSnapshot)) throw new Error("not_found");

    const rawOpinion = snapshotData(opinionSnapshot);
    const opinion = sanitizeOpinion({ id: opinionSnapshot.id, ...rawOpinion });
    const persistedIp = rawOpinion.ip || "";
    if (opinion.hidden) throw new Error("not_found");

    if (contentType === "opinion") {
      if (action === "like") opinion.likes = duplicate ? Math.max(0, opinion.likes - 1) : opinion.likes + 1;
      if (action === "report") {
        opinion.reports += 1;
        opinion.reportReasons = [...(opinion.reportReasons || []), { reason: reportReason, createdAt: new Date().toISOString() }];
        if (opinion.reports >= AUTO_HIDE_REPORT_THRESHOLD) {
          opinion.hidden = true;
          opinion.moderationStatus = "reported";
          opinion.moderationReason = "auto_oculta_por_reportes";
        }
      }
    } else {
      const reply = opinion.replies.find((item) => item.id === contentId);
      if (!reply) throw new Error("not_found");
      if (action === "like") reply.likes = duplicate ? Math.max(0, reply.likes - 1) : reply.likes + 1;
      if (action === "report") {
        reply.reports += 1;
        reply.reportReasons = [...(reply.reportReasons || []), { reason: reportReason, createdAt: new Date().toISOString() }];
        if (reply.reports >= AUTO_HIDE_REPORT_THRESHOLD) {
          opinion.hidden = true;
          opinion.moderationStatus = "reported";
          opinion.moderationReason = "respuesta_auto_oculta_por_reportes";
          reply.moderationStatus = "reported";
        }
      }
    }

    updatedOpinion = { ...opinion, ip: "" };
    active = !duplicate;
    if (ctx.mode === "client") {
      if (duplicate && action === "like") {
        previewActions.delete(actionId);
      } else {
        previewActions.add(actionId);
      }
    } else if (duplicate && action === "like") {
      transaction.delete(actionRef);
    } else {
      transaction.set(actionRef, {
        ipHash,
        contentType,
        contentId,
        opinionId,
        action,
        reason: action === "report" ? reportReason : "",
        createdAt: ctx.timestamp()
      });
    }
    transaction.set(opinionRef, { ...opinion, ip: persistedIp }, { merge: true });
  }).catch((error) => {
    if (error.message === "already_liked") {
      return reject(response, 409, "already_liked", "Ya marcaste me gusta");
    }
    if (error.message === "already_reported") {
      return reject(response, 409, "already_reported", "Ya reportaste este contenido.");
    }
    if (error.message === "not_found") {
      return reject(response, 404, "not_found", "No se encontro el contenido.");
    }
    throw error;
  });

  if (!response.headersSent) response.status(200).json({ ok: true, opinion: updatedOpinion, active, mode: ctx.mode });
}

module.exports = async function handler(request, response) {
  setSecurityHeaders(response);

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return reject(response, 405, "method_not_allowed", "Metodo no permitido.");
  }

  if (!isAllowedRequestOrigin(request)) {
    return reject(response, 403, "invalid_origin", "Origen no permitido.");
  }

  if (!hasValidRequestSize(request)) {
    return reject(response, 413, "payload_too_large", "El contenido enviado es demasiado grande.");
  }

  try {
    const ip = getRequestIp(request);
    if (!ip) return reject(response, 400, "missing_ip", "No se pudo validar la IP del request.");

    const body = typeof request.body === "object" ? request.body : JSON.parse(request.body || "{}");
    const ctx = await getContext();
    const ipHash = hashIp(ip);

    if (body.action === "createOpinion") return createOpinion(ctx, body, ipHash, response);
    if (body.action === "createReply") return createReply(ctx, body, ipHash, response);
    if (body.action === "like" || body.action === "report") return registerContentAction(ctx, body, ipHash, response);

    return reject(response, 400, "invalid_action", "Accion invalida.");
  } catch (error) {
    console.error("Moderation API error", error);
    return reject(response, 500, "server_error", "No se pudo validar la accion en el servidor.");
  }
};
