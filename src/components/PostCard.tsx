import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import Button from "./Button";
import CategoryChip from "./CategoryChip";

type PostCardProps = {
  post: PostMeta;
  eager?: boolean; // load the cover immediately instead of when scrolled near
};

export default function PostCard({ post, eager = false }: PostCardProps) {
  const href = `/blog/${post.slug}`;
  const image = post.cover;

  return (
    <article className="flex h-full flex-col border-4 border-ink bg-white p-6 shadow-brutal">
      {image && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative mb-4 block aspect-video overflow-hidden border-2 border-ink"
        >
          <Image
            src={image}
            alt=""
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 450px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </Link>
      )}

      <p className="text-sm font-bold uppercase">
        <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
        {post.readingMinutes} min read
      </p>
      <h2 className="mt-1 text-2xl font-black">
        <Link href={href} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2">{post.description}</p>

      {(post.youtubeId || post.categories.length > 0) && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.youtubeId && (
            <li>
              <CategoryChip slug="video" />
            </li>
          )}
          {post.categories.map((category) => (
            <li key={category}>
              <CategoryChip slug={category} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex justify-end pt-6">
        <Button href={href}>
          Read post →<span className="sr-only">: {post.title}</span>
        </Button>
      </div>
    </article>
  );
}
