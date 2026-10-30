import { getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { COLORS, OG_SIZE, renderOgImage } from "@/lib/og";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

// Each blog post gets its own link preview: title on its first category's color.
export const alt = `Blog post on ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Tailwind class -> hex, for the category colors used on the card background.
const BG_BY_CLASS: Record<string, string> = {
  "bg-pink": COLORS.pink,
  "bg-blue": COLORS.blue,
  "bg-lilac": COLORS.lilac,
  "bg-sun": COLORS.sun,
  "bg-mint": COLORS.mint,
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const first = post?.categories[0];

  return renderOgImage({
    eyebrow: `${SITE.name} · Blog`,
    title: post?.title ?? "Blog",
    subtitle: post ? `${formatDate(post.date)} · ${post.readingMinutes} min read` : undefined,
    background: (first && BG_BY_CLASS[getCategory(first).color]) ?? COLORS.sun,
  });
}
