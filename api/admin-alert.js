const allowedOrigins = new Set([
  "https://quieroopinar.com.ar",
  "https://www.quieroopinar.com.ar",
  "http://localhost:3000",
  "http://localhost:5173",
]);

function setSecurityHeaders(req, res) {
  const origin = req.headers.origin;
  if (allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 4096) {
        reject(new Error("body_too_large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function cleanText(value, fallback = "sin dato") {
  return String(value || fallback).replace(/[<>]/g, "").slice(0, 180);
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.headers["x-real-ip"] || "ip no disponible";
}

async function sendAdminAlert({ email, reason, path, userAgent, ip }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_ALERT_EMAIL || "lucasfedericobellani@gmail.com";
  const from = process.env.ADMIN_ALERT_FROM || "Quiero Opinar <alertas@quieroopinar.com.ar>";

  if (!apiKey) {
    return { skipped: true, reason: "missing_resend_api_key" };
  }

  const attemptedEmail = cleanText(email, "email no ingresado");
  const safeReason = cleanText(reason, "intento fallido");
  const safePath = cleanText(path, "/admin");
  const safeUserAgent = cleanText(userAgent, "navegador no disponible");
  const safeIp = cleanText(ip, "ip no disponible");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Alerta: intento de ingreso al panel admin",
      text: [
        "Hubo un intento fallido de ingreso al panel de Quiero Opinar.",
        "",
        `Email ingresado: ${attemptedEmail}`,
        `Motivo: ${safeReason}`,
        `Ruta: ${safePath}`,
        `IP: ${safeIp}`,
        `Navegador: ${safeUserAgent}`,
        `Fecha: ${new Date().toISOString()}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`resend_${response.status}`);
  }

  return { skipped: false };
}

module.exports = async function handler(req, res) {
  setSecurityHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    res.status(403).json({ ok: false, error: "origin_not_allowed" });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const result = await sendAdminAlert({
      email: body.email,
      reason: body.reason,
      path: body.path,
      userAgent: req.headers["user-agent"],
      ip: getClientIp(req),
    });
    res.status(200).json({ ok: true, skipped: result.skipped || false });
  } catch (error) {
    console.error("No se pudo enviar alerta admin.", error);
    res.status(200).json({ ok: false });
  }
};
