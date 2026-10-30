# Blog — Design Spec

Date: 2026-10-26
Status: Draft, awaiting review

## Goal

A blog for the site. Each post is one Markdown file, and posts can optionally be linked to a YouTube video. Keep it simple enough to ship quickly. This is also a learning project (React / Next.js / Tailwind).

## Decisions

- **Plain Markdown** (`.md`), not MDX. Rendered with `react-markdown` + `remark-gfm`; frontmatter is parsed with `gray-matter`.
- **No CMS yet.** Sanity is deferred to a later milestone. Pages only talk to `src/lib/posts.ts`, which keeps a future migration contained.
- **Video write-ups are normal blog posts** with a `youtubeId` field. There is no separate content type.

## Content format

Location: `content/blog/<slug>.md`. The filename (minus `.md`) becomes the slug, so the URL is `/blog/<slug>`.

```markdown
---
title: "How I Edit My YouTube Videos"     # required
date: "2026-10-26"                         # required, YYYY-MM-DD
description: "One-line summary."           # required
tags: ["youtube", "editing"]               # optional, default []
draft: false                               # optional, default false
cover: "/blog/how-i-edit/cover.jpg"        # optional
youtubeId: "dQw4w9WgXcQ"                   # optional
---

Markdown body…
```

Images go in `public/blog/<slug>/` and are referenced as `/blog/<slug>/file.jpg`.

## Files

| File | Responsibility |
|---|---|
| `src/lib/posts.ts` | `getAllPosts()` returns metadata for all posts, newest first, with drafts excluded in production. `getPost(slug)` returns metadata + body, or `null`. Throws a clear error naming the file if a required field is missing. |
| `src/lib/youtube.ts` | `youtubeThumbnail(id)` returns `https://img.youtube.com/vi/<id>/hqdefault.jpg` |
| `src/app/blog/page.tsx` | List page (server component). Shows a "No posts yet" message when empty. |
| `src/app/blog/[slug]/page.tsx` | Post page. Uses `generateStaticParams` and `generateMetadata`; calls `notFound()` for unknown slugs. |
| `src/components/PostCard.tsx` | One post in the list |
| `src/components/Markdown.tsx` | `react-markdown` with Tailwind-styled elements (headings, links, lists, code, lazy-loaded `<img>`) |
| `src/components/YouTubeEmbed.tsx` | Responsive 16:9 iframe (`youtube-nocookie.com`). Reusable by the Videos page later. |
| `next.config.ts` | Add `images.remotePatterns` for `img.youtube.com` |

## PostCard rules

Two independent rules:

1. **Image:** use `cover` if set, else `youtubeThumbnail(youtubeId)` if set, else no image.
2. **Play icon:** a floating ▶ is drawn over the image whenever `youtubeId` is set, regardless of the image source. If there's no image, the icon shows inline next to the date.

The card also shows the date, title, description, and tags as non-clickable chips. It uses the site's neo-brutalist style (`border-4 border-ink`, `shadow-brutal`, a hover lift like `Button`), and the whole card links to the post.

## Post page layout

Back link → title → date and tags → media (`YouTubeEmbed` if `youtubeId`, else `cover` image if set) → Markdown body in a narrow column (~65ch).

## Out of scope (later)

Clickable tag pages, search, pagination, RSS, MDX, Sanity, and the Videos page's "Read the write-up" link.

## Verification

- `npm run build` succeeds, and each post is statically generated.
- Manual check in `npm run dev`: the list shows posts newest first; the ▶ appears on video posts (with both thumbnail and custom cover); the post page renders Markdown, images, and the embed; `/blog/nope` returns 404; drafts are visible in dev and absent from the production build.
- Deleting `title` from a post makes the build fail with an error naming that file.
