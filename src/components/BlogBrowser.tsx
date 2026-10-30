"use client";

import { FaPlay } from "react-icons/fa";
import { CATEGORIES, VIDEO_FILTER } from "@/lib/categories";
import type { PostMeta } from "@/lib/posts";
import FilterControls, { type FilterOption } from "./FilterControls";
import PostGrid from "./PostGrid";

export default function BlogBrowser({ posts }: { posts: PostMeta[] }) {
  // Only offer filters that would actually show something.
  const filters: FilterOption[] = [
    ...(posts.some((post) => post.youtubeId)
      ? [{ ...VIDEO_FILTER, icon: <FaPlay aria-hidden="true" /> }]
      : []),
    ...CATEGORIES.filter((c) => posts.some((post) => post.categories.includes(c.slug))),
  ];

  return (
    <FilterControls filters={filters} searchLabel="Search posts">
      {({ category, search }) => {
        const visible = posts.filter((post) => {
          if (category === VIDEO_FILTER.slug && !post.youtubeId) return false;
          if (category && category !== VIDEO_FILTER.slug && !post.categories.some((c) => c === category)) {
            return false;
          }
          return `${post.title} ${post.description}`.toLowerCase().includes(search);
        });

        return visible.length > 0 ? (
          <PostGrid posts={visible} />
        ) : (
          <p className="font-bold">No posts match. Try another search or category.</p>
        );
      }}
    </FilterControls>
  );
}
