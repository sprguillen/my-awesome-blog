"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { Menu, X } from "lucide-react"; // Import Lucide icons

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          My Awesome Blog
        </Link>
        <div className="hidden md:flex gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {user ? (
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
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link href="/" className="block hover:underline" onClick={toggleMenu}>
              Home
            </Link>
            {user ? (
              <>
                <Link href="/posts/create" className="block hover:underline" onClick={toggleMenu}>
                  Create Post
                </Link>
                <Link href="/logout" className="block hover:underline" onClick={toggleMenu}>
                  Logout
                </Link>
              </>
            ) : (
              <Link href="/login" className="block hover:underline" onClick={toggleMenu}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
