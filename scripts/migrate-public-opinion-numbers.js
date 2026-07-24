const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const envPath = path.join(process.cwd(), ".env.migration.local");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    let trimmed = lines[index].trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex <= 0) continue;
    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    const quote = value[0];
    if ((quote === '"' || quote === "'") && !value.endsWith(quote)) {
      while (index + 1 < lines.length) {
        index += 1;
        value += `\n${lines[index]}`;
        if (lines[index].trim().endsWith(quote)) break;
      }
    }
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function getMillis(value, fallback) {
  if (value?.toDate) return value.toDate().getTime();
  const millis = new Date(value || 0).getTime();
  return Number.isNaN(millis) ? fallback : millis;
}

function initAdmin() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID || "quiero-opinar-app";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (serviceAccountJson) {
    const normalizedJson = serviceAccountJson
      .replace(/\\n\s*(?=")/g, "")
      .replace(/\\n\s*(?=})/g, "");
    const jsonStart = normalizedJson.indexOf("{");
    const jsonEnd = normalizedJson.lastIndexOf("}");
    admin.initializeApp({ credential: admin.credential.cert(JSON.parse(normalizedJson.slice(jsonStart, jsonEnd + 1))) });
    return;
  }

  if (clientEmail && privateKey) {
    admin.initializeApp({ credential: admin.credential.cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") }) });
    return;
  }

  throw new Error("Missing Firebase Admin credentials.");
}

async function main() {
  loadEnvFile(envPath);
  initAdmin();

  const db = admin.firestore();
  const snapshot = await db.collection("opinions").get();
  const opinions = snapshot.docs
    .map((doc, index) => ({ ref: doc.ref, id: doc.id, index, data: doc.data() }))
    .sort((a, b) => {
      const dateDiff = getMillis(a.data.createdAt, a.index) - getMillis(b.data.createdAt, b.index);
      if (dateDiff !== 0) return dateDiff;
      return a.id.localeCompare(b.id);
    });

  const usedNumbers = new Set();
  opinions.forEach((opinion) => {
    const publicNumber = Number(opinion.data.publicNumber || 0);
    if (Number.isInteger(publicNumber) && publicNumber > 0) usedNumbers.add(publicNumber);
  });

  let nextNumber = 1;
  const updates = [];
  opinions.forEach((opinion) => {
    const currentNumber = Number(opinion.data.publicNumber || 0);
    if (Number.isInteger(currentNumber) && currentNumber > 0) return;
    while (usedNumbers.has(nextNumber)) nextNumber += 1;
    updates.push({ ref: opinion.ref, id: opinion.id, publicNumber: nextNumber });
    usedNumbers.add(nextNumber);
    nextNumber += 1;
  });

  let batch = db.batch();
  let batchSize = 0;
  for (const update of updates) {
    batch.set(update.ref, { publicNumber: update.publicNumber }, { merge: true });
    batchSize += 1;
    if (batchSize === 450) {
      await batch.commit();
      batch = db.batch();
      batchSize = 0;
    }
  }
  if (batchSize > 0) await batch.commit();

  const finalNextNumber = Math.max(0, ...Array.from(usedNumbers)) + 1;
  await db.collection("meta").doc("opinions").set({
    nextPublicNumber: finalNextNumber,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  console.log(JSON.stringify({
    totalOpinions: opinions.length,
    updatedOpinions: updates.length,
    nextPublicNumber: finalNextNumber
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
