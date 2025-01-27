"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          My Awesome Blog
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {
            user ? (
              <>
                <Link href="/posts/create" className="hover:underline">
                  Create Post
                </Link>
                <Link href="/logout" className="hover:underline">
                  Logout
                </Link>
              </>
            ) : (
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            )
          }
        </div>
      </div>
    </nav>
  );
}
