import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function PostGrid({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {posts.map((post, index) => (
        <li key={post.slug}>
          {/* The first row (2 cards on desktop) is visible without scrolling, so load those images right away. */}
          <PostCard post={post} eager={index < 2} />
        </li>
      ))}
    </ul>
  );
}
