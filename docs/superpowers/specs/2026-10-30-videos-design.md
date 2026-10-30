# Videos Page — Design Spec

Date: 2026-10-30
Status: Draft, awaiting review

## Goal

A catalog of the user's YouTube videos at `/videos`. Its job is to send viewers to YouTube. The list is maintained by hand for now; it may be replaced by the YouTube Data API later without changing the page.

## Decisions

- **Manual list** in `content/videos.ts`, a typed TypeScript array that the editor checks while typing. (The API and RSS feed were considered and deferred.)
- **Clicking a video opens it on YouTube in a new tab.** There are no per-video pages and no popup player.
- **The same category list as the blog** (`src/lib/categories.ts`). Videos may use any category.
- **Filter bars only show categories that have content** on that page, on both `/videos` and `/blog`. On `/blog`, the Video filter appears only if at least one post has a `youtubeId`.
- **Write-up links are automatic**: a blog post whose `youtubeId` matches a video's ID becomes that video's write-up.

## Content format

```ts
// content/videos.ts
export const videos: VideoInput[] = [
  {
    youtube: "https://youtu.be/GXbZc1sHEJY", // link or bare ID
    title: "Video title",
    date: "2026-10-23",                      // YYYY-MM-DD
    categories: ["gear"],                    // CategorySlug[], may be empty
  },
];
```

## Files

| File | Responsibility |
|---|---|
| `content/videos.ts` | The hand-edited list (`VideoInput[]`) |
| `src/lib/videos.ts` | `VideoInput` / `Video` types. `getAllVideos()` parses IDs with `parseYouTubeId`, sorts newest first, and attaches `writeUpSlug` from `getAllPosts()`. It throws on an invalid link or a duplicate ID. |
| `src/components/FilterControls.tsx` | Client component, shared by both pages: search input + category filter bar, with state in the URL (`?category=&q=`). It receives the filters to show and renders the results through children/props. |
| `src/components/BlogBrowser.tsx` | Refactored to use `FilterControls` |
| `src/components/VideoBrowser.tsx` | `FilterControls` + video grid. Search matches the title. |
| `src/components/VideoCard.tsx` | Thumbnail (`next/image` from `img.youtube.com/vi/<id>/hqdefault.jpg`) with a ▶ overlay, date, title + ↗, category chips, and an optional "Read the write-up →". The thumbnail and title link to `https://www.youtube.com/watch?v=<id>` with `target="_blank" rel="noopener noreferrer"`. |
| `src/components/CategoryChip.tsx` | New `basePath` prop (`/blog` or `/videos`) for where the chip links |
| `src/app/videos/page.tsx` | Server page: `getAllVideos()` → `<Suspense>` + `VideoBrowser`, with all videos as the fallback. Empty state: "No videos yet." |
| `next.config.ts` | Re-add `images.remotePatterns` for `img.youtube.com/vi/**` |

## Card layout

The same brutalist card as `PostCard`: 2 columns from `sm:`, the first row loads eagerly, and the ▶ overlay is kept, because here it really opens the video. The ↗ icon has screen-reader text "(opens YouTube in a new tab)".

## Out of scope (later)

Duration and view counts (needs the API), the YouTube API/RSS source, "Latest videos" on the home page.

## Verification

- `tsc`, `eslint`, and `next build` pass
- `/videos` lists videos newest first; the thumbnail and title open YouTube in a new tab
- A video with a matching blog post shows "Read the write-up →" linking to that post
- Filter bars hide categories with no content (`/blog` hides Gear while no post uses it)
- An invalid `youtube` value or a duplicate ID fails the build with a message naming the entry
