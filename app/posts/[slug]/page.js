import { notFound } from "next/navigation";
import Post from "@/components/post";
import { getPosts } from "@/lib/posts";

export default async function PostDetail({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <Post post={post} />
  );
}