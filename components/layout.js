"use client";

import { AuthProvider } from "@/context/AuthProvider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </AuthProvider>
  )
}