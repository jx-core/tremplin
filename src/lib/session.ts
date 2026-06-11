/* Edge-safe session token helpers (jose only, no next/headers, no node APIs).
   Imported by both middleware (edge) and the server-only auth module. */
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const SESSION_COOKIE = "tremplin_admin";
const ALG = "HS256";

function getSecret(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    console.warn("[auth] SESSION_SECRET missing or too short, using an insecure fallback. Set a long random SESSION_SECRET in production.");
  }
  return new TextEncoder().encode(
    s && s.length >= 16 ? s : "insecure-dev-fallback-secret-change-me"
  );
}

export interface SessionPayload extends JWTPayload {
  username: string;
}

export async function signSession(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySession(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return typeof payload.username === "string" ? (payload as SessionPayload) : null;
  } catch {
    return null;
  }
}
