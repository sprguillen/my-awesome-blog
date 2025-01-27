"use client";
import Link from "next/link";

export default function Posts({ posts }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="bg-white rounded-lg shadow p-5 flex flex-col"
        >
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            {post.title}
          </h3>
          <p className="text-gray-600 flex-grow">{post.excerpt}</p>
          <Link
            href={`/posts/${post.slug}`}
            className="mt-4 inline-block text-blue-600 font-medium hover:underline"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}