import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { formatDate } from "@/lib/format";
import type { Video } from "@/lib/videos";
import Button from "./Button";
import CategoryChip from "./CategoryChip";

type VideoCardProps = {
  video: Video;
  eager?: boolean; // load the thumbnail immediately instead of when scrolled near
};

export default function VideoCard({ video, eager = false }: VideoCardProps) {
  return (
    <article className="flex h-full flex-col border-4 border-ink bg-white p-6 shadow-brutal">
      {/* Plain <a>, not next/link: it leaves the site. The title below is the accessible link. */}
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="group relative mb-4 block aspect-video overflow-hidden border-2 border-ink"
      >
        <Image
          src={video.thumbnail}
          alt=""
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 450px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Honest here: clicking really plays the video (on YouTube). */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full border-4 border-ink bg-accent shadow-brutal-sm transition-transform group-hover:scale-110">
            <FaPlay className="ml-1 text-2xl text-white" />
          </span>
        </span>
      </a>

      <p className="text-sm font-bold uppercase">
        <time dateTime={video.date}>{formatDate(video.date)}</time>
      </p>
      <h2 className="mt-1 text-2xl font-black">
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {video.title} <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens YouTube in a new tab)</span>
        </a>
      </h2>
      {video.description && <p className="mt-2">{video.description}</p>}

      {video.categories.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {video.categories.map((category) => (
            <li key={category}>
              <CategoryChip slug={category} basePath="/videos" />
            </li>
          ))}
        </ul>
      )}

      {/* Two equal halves so both buttons always share one line; YouTube always takes the right half. */}
      <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
        {video.writeUpSlug && (
          <Button
            href={`/blog/${video.writeUpSlug}`}
            variant="secondary"
            size="sm"
            className="text-center"
          >
            Read the write-up →<span className="sr-only">: {video.title}</span>
          </Button>
        )}
        <Button href={video.url} external size="sm" className="col-start-2 text-center">
          Watch on YouTube <span aria-hidden="true">↗</span>
          <span className="sr-only">: {video.title} (opens in a new tab)</span>
        </Button>
      </div>
    </article>
  );
}
