import { NextResponse } from "next/server";
import { verifyAuthSession } from "@/lib/auth";

export async function GET(request) {
  try {
    const auth = await verifyAuthSession();
    const { user } = auth;

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ user: null }, { status: 200 });
    }
  } catch (error) {
    console.error("Error getting user data", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}