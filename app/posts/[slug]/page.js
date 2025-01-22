import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

export default function PostDetail({ params }) {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-md shadow p-8 mt-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        By {post.author} on {post.publishedDate}
      </div>
      <div
        className="prose prose-indigo"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}