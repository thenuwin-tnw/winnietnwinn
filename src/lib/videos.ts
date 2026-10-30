import { videos as videoList } from "../../content/videos";
import type { CategorySlug } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { parseYouTubeId } from "@/lib/youtube";

// What you write in content/videos.ts
export type VideoInput = {
  youtube: string; // a YouTube link or bare video ID
  title: string;
  description?: string; // optional one-liner shown on the card
  date: string; // YYYY-MM-DD
  categories: CategorySlug[];
  featured?: boolean; // true = shown in "Featured videos" on the home page
};

// What the site uses
export type Video = {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
  date: string;
  categories: CategorySlug[];
  featured: boolean;
  writeUpSlug?: string; // slug of the blog post with the same youtubeId, if any
};

export function getAllVideos(): Video[] {
  // youtubeId -> post slug, so each video can find its write-up
  const writeUps = new Map<string, string>();
  for (const post of getAllPosts()) {
    if (post.youtubeId) writeUps.set(post.youtubeId, post.slug);
  }

  const seen = new Set<string>();

  return videoList
    .map((input) => {
      const id = parseYouTubeId(input.youtube);
      if (!id) {
        throw new Error(`content/videos.ts: "${input.title}" has a youtube value that isn't a YouTube ID or link`);
      }
      if (seen.has(id)) {
        throw new Error(`content/videos.ts: "${input.title}" is listed twice`);
      }
      seen.add(id);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
        throw new Error(`content/videos.ts: "${input.title}" needs a date like "2026-10-23"`);
      }

      return {
        id,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        title: input.title,
        description: input.description,
        featured: input.featured ?? false,
        date: input.date,
        categories: input.categories,
        writeUpSlug: writeUps.get(id),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
