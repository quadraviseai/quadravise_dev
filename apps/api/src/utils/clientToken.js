import crypto from "crypto";

import { env } from "../config/env.js";

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function parseBase64url(input) {
  return Buffer.from(input, "base64url").toString("utf-8");
}

function sign(content) {
  return crypto.createHmac("sha256", env.clientTokenSecret).update(content).digest("base64url");
}

export function createClientToken(payload = {}) {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12
    })
  );
  const signature = sign(`${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

export function verifyClientToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expected = sign(`${header}.${body}`);
  const sigA = Buffer.from(signature);
  const sigB = Buffer.from(expected);
  if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) return null;

  try {
    const payload = JSON.parse(parseBase64url(body));
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

