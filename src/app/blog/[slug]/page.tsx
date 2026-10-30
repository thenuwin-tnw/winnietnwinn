import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryChip from "@/components/CategoryChip";
import Container from "@/components/Container";
import Markdown from "@/components/Markdown";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPost } from "@/lib/posts";

// Build one static HTML page per post at build time.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Any slug not returned above is a 404 instead of being rendered on demand.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-[65ch]">
        <Link href="/blog" className="font-bold uppercase hover:underline">
          ← Back to blog
        </Link>

        <h1 className="mt-6 text-4xl font-black uppercase">{post.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold uppercase">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>· {post.readingMinutes} min read</span>
          {post.youtubeId && <CategoryChip slug="video" />}
          {post.categories.map((category) => (
            <CategoryChip key={category} slug={category} />
          ))}
          {post.draft && (
            <span className="border-2 border-ink bg-pink px-2 py-0.5 text-xs">Draft</span>
          )}
        </div>

        <div className="mt-8">
          {post.youtubeId ? (
            <YouTubeEmbed id={post.youtubeId} title={post.title} />
          ) : (
            post.cover && (
              <div className="relative aspect-video border-4 border-ink">
                <Image
                  src={post.cover}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 65ch, 100vw"
                  className="object-cover"
                />
              </div>
            )
          )}
        </div>

        <div className="mt-8">
          <Markdown content={post.content} />
        </div>
      </article>
    </Container>
  );
}
