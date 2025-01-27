import { redirect, notFound } from "next/navigation";
import { verifyAuthSession } from "@/lib/auth";
import { getPosts } from "@/lib/posts";
import PostForm from "@/components/post-form";

export default async function EditPost({ params }) {
  const { user } = await verifyAuthSession();
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!user) {
    return redirect('/login');
  }

  if (!post) {
    notFound();
  }

  return (
    <section className="max-w-xl mx-auto bg-white mt-10 p-8 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit an Existing Post</h2>
      <PostForm existingPost={post} editMode />
    </section>
  )
}
