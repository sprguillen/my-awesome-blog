import { redirect } from "next/navigation";
import { verifyAuthSession } from "@/lib/auth";
import PostForm from "@/components/post-form";

export default async function CreatePost() {
  const { user } = await verifyAuthSession();

  if (!user) {
    return redirect('/login');
  }

  return (
    <section className="max-w-xl mx-auto bg-white mt-10 p-8 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Create a New Post</h2>
      <PostForm />
    </section>
  )
}
