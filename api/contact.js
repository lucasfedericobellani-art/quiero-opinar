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
      if (body.length > 8192) {
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

function cleanText(value, maxLength, fallback = "") {
  return String(value || fallback).replace(/[<>]/g, "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendContactEmail({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const intendedTo = "quieroopinararg@gmail.com";
  const to = process.env.CONTACT_EMAIL || process.env.ADMIN_ALERT_EMAIL || "lucasfedericobellani@gmail.com";
  const from = process.env.ADMIN_ALERT_FROM || "Quiero Opinar <alertas@quieroopinar.com.ar>";

  if (!apiKey) {
    return { skipped: true, reason: "missing_resend_api_key" };
  }

  const safeName = cleanText(name, 160, "Sin nombre");
  const safeEmail = cleanText(email, 180, "Sin email informado");
  const safeMessage = cleanText(message, 4000);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: isValidEmail(safeEmail) ? safeEmail : undefined,
      subject: "Nueva consulta desde Quiero Opinar",
      text: [
        "Nueva consulta recibida desde quieroopinar.com.ar.",
        `Destino solicitado: ${intendedTo}`,
        "",
        `Nombre: ${safeName}`,
        `Email para responder: ${safeEmail}`,
        "",
        "Consulta:",
        safeMessage,
        "",
        `Fecha: ${new Date().toISOString()}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`resend_${response.status}_${errorBody.slice(0, 240)}`);
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
    const message = cleanText(body.message, 4000);
    if (!message) {
      res.status(400).json({ ok: false, error: "missing_message" });
      return;
    }

    const result = await sendContactEmail({
      name: body.name,
      email: body.email,
      message,
    });

    res.status(200).json({ ok: true, skipped: result.skipped || false });
  } catch (error) {
    console.error("No se pudo enviar consulta de contacto.", error);
    res.status(500).json({ ok: false, error: "send_failed" });
  }
};
