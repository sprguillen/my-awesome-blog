import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from '@/initdb';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
});

/**
 *Create a new session for login purposes
 */
export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

/**
 * Verify the current user if authenticated, primarily used for route guarding for some pages that are not accessible to unauthenticated users
 */
export async function verifyAuthSession() {
  // Retrieve the session cookie from the incoming request
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  // If no session cookie is found, return null values indicating no authenticated user
  // The reason for this structure is because a valid session returns an object that contains
  // the current logged-in user and the current session
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  // If no sessionId is found, return null values indicating no authenticated user
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  // Validate the session ID using Lucia's session validation
  const result = await lucia.validateSession(sessionId);

  try {
    // Fresh means that the session is newly created
    if (result.session && result.session.fresh) {
      // Generate a new session cookie to refresh the session
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } else {
      // If the session is expired, create a blank session cookie to remove it
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch (error) {

  }

  return result;
}

/**
 * Destroy the current session and remove the session cookie for logout purposes
 */
export async function destroySession() {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      error: 'Unauthorized!'
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      error: 'Unauthorized!'
    };
  }

  // Invalidate the session and assign the cookie to a blank session cookie
  await lucia.invalidateSession(sessionId);
  const blankSessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(blankSessionCookie.name, blankSessionCookie.value, blankSessionCookie.attributes);
}
