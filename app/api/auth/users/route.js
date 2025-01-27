import { NextResponse } from "next/server";
import { getCurrentLoggedInUser } from "@/lib/users";

export async function GET(request) {
  try {
    const user = await getCurrentLoggedInUser();
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