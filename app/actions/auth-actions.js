"use server";

import { redirect } from "next/navigation";
import { compareSync } from "bcrypt";
import { createAuthSession } from "@/lib/auth";
import db from '@/initdb';

export async function signin(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  console.log(username);
  const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);
  const errors = {};

  console.log(user);

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

  try {
    await createAuthSession(user.id);
    redirect("/");;
  } catch (error) {
    throw error;
  }
}
