import sql from "better-sqlite3";
import { cookies } from "next/headers";
import { lucia } from "./auth";
const db = sql('blog.db');

export async function getCurrentLoggedInUser(id) {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return null;
  }

  const sessionId = sessionCookie.value;

  if (sessionId) {
    const result = await lucia.validateSession(sessionId);
    if (result) {
      const { user: { id } } = result;
      return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    } else {
      return null;
    }
  }

  return null;
}
