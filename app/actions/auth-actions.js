"use server";
import { redirect } from "next/navigation";
import { compareSync } from "bcrypt";
import { createAuthSession, destroySession } from "@/lib/auth";
import db from '@/initdb';

export async function signin(prevState, formData) {
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);
    const errors = {};

    if (!user) {
      errors.username = "User does not exist on our system.";
      return {
        errors,
      };
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      errors.password = "Password is incorrect.";
      return {
        errors,
      };
    }
  
    await createAuthSession(user.id);
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  await destroySession();
  redirect("/");
}
