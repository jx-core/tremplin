/* Server-only admin auth: credential check + session cookie management. */
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import {
  SESSION_COOKIE,
  signSession,
  verifySession,
  type SessionPayload,
} from "./session";

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  if (username !== expectedUser) return false;

  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch {
      return false;
    }
  }
  const expected = process.env.ADMIN_PASSWORD || "";
  return expected.length > 0 && password === expected;
}

export async function login(username: string): Promise<void> {
  const token = await signSession(username);
  const c = await cookies();
  c.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function logout(): Promise<void> {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  return verifySession(c.get(SESSION_COOKIE)?.value);
}
