import fs from "node:fs"; // Node's file system: read folders and files
import path from "node:path"; // build file paths safely
import matter from "gray-matter";
import { CATEGORIES, isCategorySlug, type CategorySlug } from "@/lib/categories";
import { parseYouTubeId } from "@/lib/youtube";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  categories: CategorySlug[];
  draft: boolean;
  cover?: string; // ? = optional, may be undefined
  youtubeId?: string;
  readingMinutes: number; // calculated from the body, never written in frontmatter
};

export type Post = PostMeta & {
  content: string; // the Markdown body
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const REQUIRED_FIELDS = ["title", "date", "description"] as const;

// Drafts show up in `npm run dev`, but are left out of the production build.
const showDrafts = process.env.NODE_ENV !== "production";

// Average adult reading speed is roughly 200–250 words per minute.
const WORDS_PER_MINUTE = 200;

function getReadingMinutes(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function readPost(slug: string): Post {
  const filename = `${slug}.md`;
  const fileText = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(fileText);

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      throw new Error(
        `content/blog/${filename} is missing "${field}" in its frontmatter`,
      );
    }
  }

  // Unquoted YAML dates (date: 2026-10-26) become Date objects; turn them back into "YYYY-MM-DD".
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date);

  if (data.tags) {
    throw new Error(
      `content/blog/${filename} uses "tags"; rename it to "categories"`,
    );
  }

  // Accept "Tech" or "tech"; anything not in the fixed list fails the build.
  const categories: CategorySlug[] = [];
  for (const raw of data.categories ?? []) {
    const value = String(raw).trim().toLowerCase();
    if (!isCategorySlug(value)) {
      const allowed = CATEGORIES.map((c) => c.slug).join(", ");
      throw new Error(
        `content/blog/${filename} has unknown category "${raw}". Allowed: ${allowed}`,
      );
    }
    if (!categories.includes(value)) categories.push(value);
  }

  let youtubeId: string | undefined;
  if (data.youtubeId) {
    youtubeId = parseYouTubeId(String(data.youtubeId));
    if (!youtubeId) {
      throw new Error(
        `content/blog/${filename} has a youtubeId that isn't a YouTube ID or link`,
      );
    }
  }

  return {
    slug,
    title: data.title,
    date,
    description: data.description,
    categories,
    draft: data.draft ?? false,
    cover: data.cover,
    youtubeId,
    readingMinutes: getReadingMinutes(content),
    content,
  };
}

function getSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- drop the body, the list doesn't need it
      const { content, ...meta } = readPost(slug);
      return meta;
    })
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  if (!getSlugs().includes(slug)) return null;
  const post = readPost(slug);
  if (post.draft && !showDrafts) return null;
  return post;
}
