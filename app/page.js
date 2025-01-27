import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to My Awesome Blog
          </h1>
          <p className="text-lg text-gray-100 mb-6 max-w-2xl">
            Explore insightful articles about React, Next.js, web development,
            and more!
          </p>
        </div>
      </section>
      <section id="blog" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8">Latest Posts</h2>
          <Posts posts={posts} />
        </div>
      </section>
    </>
  );
}
