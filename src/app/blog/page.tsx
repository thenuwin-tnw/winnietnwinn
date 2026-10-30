import { Suspense } from "react";
import BlogBrowser from "@/components/BlogBrowser";
import Container from "@/components/Container";
import PostGrid from "@/components/PostGrid";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-black uppercase">Blog</h1>

      <div className="mt-8">
        {posts.length === 0 ? (
          <p className="font-bold">No posts yet. Check back soon!</p>
        ) : (
          // BlogBrowser reads the URL (?category=…&q=…), which only exists in the browser.
          // Until it loads, the fallback shows every post, so the static HTML still has them all.
          <Suspense fallback={<PostGrid posts={posts} />}>
            <BlogBrowser posts={posts} />
          </Suspense>
        )}
      </div>
    </Container>
  );
}
