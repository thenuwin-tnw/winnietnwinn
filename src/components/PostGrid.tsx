import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

type PostGridProps = {
  posts: PostMeta[];
  eagerFirstRow?: boolean; // false when the grid starts below the fold
};

export default function PostGrid({ posts, eagerFirstRow = true }: PostGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {posts.map((post, index) => (
        <li key={post.slug}>
          {/* The first row (2 cards on desktop) is visible without scrolling, so load those images right away. */}
          <PostCard post={post} eager={eagerFirstRow && index < 2} />
        </li>
      ))}
    </ul>
  );
}
