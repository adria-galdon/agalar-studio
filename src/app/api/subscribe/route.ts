// Endpoint de suscripción "Notifícame cuando salga Nexus".
//
// Diseñado para desplegar sin fricción:
//   - Sin configurar nada: valida y registra el alta en el log del servidor.
//   - Con RESEND_API_KEY + NOTIFY_AUDIENCE_ID: da de alta el contacto en Resend.
//   - Con SUBSCRIBE_WEBHOOK_URL: reenvía el alta a cualquier webhook (Zapier,
//     Make, tu propio backend…).
//
// Incluye validación de correo, honeypot anti-bots y un rate-limit por IP
// en memoria (suficiente para un sitio de un estudio; para escala real,
// usar un almacén compartido como Upstash/Redis).

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; ts: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera un minuto." },
      { status: 429 }
    );
  }

  let body: { email?: unknown; company?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  // Honeypot: si viene relleno, es un bot. Respondemos OK sin hacer nada.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ error: "Correo no válido." }, { status: 400 });
  }

  const email = body.email.toLowerCase();
  const source = typeof body.source === "string" ? body.source.slice(0, 60) : "site";

  try {
    await persistSubscription(email, source);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] fallo al persistir:", err);
    return NextResponse.json({ error: "No se pudo guardar." }, { status: 502 });
  }
}

async function persistSubscription(email: string, source: string) {
  const { RESEND_API_KEY, NOTIFY_AUDIENCE_ID, SUBSCRIBE_WEBHOOK_URL } = process.env;

  if (RESEND_API_KEY && NOTIFY_AUDIENCE_ID) {
    const res = await fetch(
      `https://api.resend.com/audiences/${NOTIFY_AUDIENCE_ID}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }
    );
    if (!res.ok && res.status !== 409) {
      throw new Error(`Resend respondió ${res.status}`);
    }
    return;
  }

  if (SUBSCRIBE_WEBHOOK_URL) {
    const res = await fetch(SUBSCRIBE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, at: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook respondió ${res.status}`);
    return;
  }

  // Sin proveedor configurado: dejamos rastro en el log para no perder el alta.
  console.log(`[subscribe] nueva alta: ${email} (origen: ${source})`);
}
