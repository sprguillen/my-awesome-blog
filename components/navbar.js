"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          My Awesome Blog
        </Link>
        <div>
          <Link href="/" className="mr-4 hover:underline">
            Home
          </Link>
          <Link href="/posts/create" className="hover:underline">
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
