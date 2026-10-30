import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import Button from "@/components/Button";
import Container from "@/components/Container";
import PostGrid from "@/components/PostGrid";
import VideoGrid from "@/components/VideoGrid";
import { getAllPosts } from "@/lib/posts";
import { SITE, SUBSCRIBE_URL } from "@/lib/site";
import { getAllVideos } from "@/lib/videos";

export default function Home() {
  const videos = getAllVideos();
  const featured = videos.filter((video) => video.featured);
  // Until any video is marked `featured: true`, fall back to the newest two so the section isn't empty.
  const homeVideos = featured.length > 0 ? featured : videos.slice(0, 2);
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <div className="py-12">
      <Container className="space-y-16">
        <section className="border-4 border-ink bg-blue p-6 shadow-brutal sm:p-10">
          <p className="text-lg font-bold">{SITE.greeting}</p>
          <h1 className="mt-2 max-w-[20ch] text-4xl font-black uppercase sm:text-5xl">
            {SITE.headline}
          </h1>
          <p className="mt-4 max-w-[50ch] text-lg font-bold">{SITE.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={SUBSCRIBE_URL} external>
              <FaYoutube aria-hidden="true" className="mr-2 inline align-[-0.15em]" />
              Subscribe <span aria-hidden="true">↗</span>
              <span className="sr-only"> on YouTube (opens in a new tab)</span>
            </Button>
            <Button href="/blog" variant="secondary">
              Read the blog →
            </Button>
          </div>
        </section>

        {homeVideos.length > 0 && (
          <section>
            <SectionHeading title="Featured videos" href="/videos" />
            <VideoGrid videos={homeVideos} />
          </section>
        )}

        {latestPosts.length > 0 && (
          <section>
            <SectionHeading title="Latest posts" href="/blog" />
            {/* Further down the page, so these images can wait until scrolled near. */}
            <PostGrid posts={latestPosts} eagerFirstRow={false} />
          </section>
        )}
      </Container>
    </div>
  );
}

function SectionHeading({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-3xl font-black uppercase">{title}</h2>
      <Link href={href} className="font-bold uppercase hover:underline">
        See all →<span className="sr-only"> {title.toLowerCase()}</span>
      </Link>
    </div>
  );
}
