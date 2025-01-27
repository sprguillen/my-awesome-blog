"use client"

import Link from "next/link";
import { useContext } from "react"
import { AuthContext } from "@/context/AuthProvider"

export default function Post({ post }) {
  const { user } = useContext(AuthContext);

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-md shadow p-8 mt-8 relative">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        By {post.author} on {post.publishedDate}
      </div>
      <div
        className="prose prose-indigo"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {
        user && (
          <Link href={`/posts/${post.slug}/edit`} className="bg-white text-blue-600 px-4 py-2 rounded border border-gray-300 absolute top-8 right-8">
            Edit Post
          </Link>
        )
      }
    </article>
  )
}