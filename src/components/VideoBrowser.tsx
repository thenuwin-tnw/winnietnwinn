"use client";

import { CATEGORIES } from "@/lib/categories";
import type { Video } from "@/lib/videos";
import FilterControls from "./FilterControls";
import VideoGrid from "./VideoGrid";

export default function VideoBrowser({ videos }: { videos: Video[] }) {
  // Only offer categories that at least one video uses.
  const filters = CATEGORIES.filter((c) => videos.some((video) => video.categories.includes(c.slug)));

  return (
    <FilterControls filters={filters} searchLabel="Search videos">
      {({ category, search }) => {
        const visible = videos.filter((video) => {
          if (category && !video.categories.some((c) => c === category)) return false;
          return `${video.title} ${video.description ?? ""}`.toLowerCase().includes(search);
        });

        return visible.length > 0 ? (
          <VideoGrid videos={visible} />
        ) : (
          <p className="font-bold">No videos match. Try another search or category.</p>
        );
      }}
    </FilterControls>
  );
}
