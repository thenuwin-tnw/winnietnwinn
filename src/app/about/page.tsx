import type { Metadata } from "next";
import Link from "next/link";
import { FaEnvelope, FaYoutube } from "react-icons/fa";
import Button from "@/components/Button";
import Container from "@/components/Container";
import PhotoFrame from "@/components/PhotoFrame";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";
import { getAllVideos } from "@/lib/videos";

export const metadata: Metadata = {
  title: "About",
  description:
    "Web developer by day, content creator by night, based in Singapore. Journaling, tech, and gear.",
};

// Not links, just things I enjoy, so they're flat chips (no shadow = not clickable).
const HOBBIES = [
  { emoji: "🍿", label: "Netflix", color: "bg-blue" },
  { emoji: "📚", label: "Reading", color: "bg-mint" },
  { emoji: "🎧", label: "Music", color: "bg-pink" },
  { emoji: "🚴", label: "Cycling", color: "bg-sun" },
  { emoji: "🍜", label: "Food", color: "bg-lilac" },
  { emoji: "✈️", label: "Travelling", color: "bg-peach" },
];

const CATEGORY_BLURBS: Record<CategorySlug, string> = {
  journaling:
    "Pocket notebooks, tracking, and making journaling actually stick.",
  gear: "Desk setups, keyboards, and the things I use every day.",
  tech: "Coding, apps, and building things on the web.",
  productivity: "Small systems and habits that keep life organized.",
  life: "Everything in between.",
};

export default function AboutPage() {
  // Only link to categories that have something to show, and send people to whichever page has it.
  const videos = getAllVideos();
  const posts = getAllPosts();
  const topics = CATEGORIES.flatMap((category) => {
    const hasVideos = videos.some((v) => v.categories.includes(category.slug));
    const hasPosts = posts.some((p) => p.categories.includes(category.slug));
    if (!hasVideos && !hasPosts) return [];
    const base = hasVideos ? "/videos" : "/blog";
    return [{ ...category, href: `${base}?category=${category.slug}` }];
  });

  return (
    <Container className="space-y-16 py-12">
      <section className="flex flex-col gap-8 border-4 border-ink bg-blue p-6 shadow-brutal sm:flex-row sm:items-center sm:gap-12 sm:p-10">
        <PhotoFrame src={SITE.photo} position={SITE.photoPosition} />

        <div>
          <p className="text-sm font-black uppercase tracking-widest">About</p>
          <h1 className="mt-1 text-4xl font-black uppercase sm:text-6xl">
            Hi, I&apos;m Winnie <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-4 text-xl font-bold sm:text-2xl">
            Web developer by day.
            <br />
            Content creator by night.
          </p>

          <ul className="mt-6 flex flex-wrap gap-3 text-sm font-black uppercase">
            <li className="border-2 border-ink bg-white px-3 py-1">
              📍 Singapore{" "}
              <span role="img" aria-label="Singapore flag">
                🇸🇬
              </span>
            </li>
            {videos.length > 0 && (
              <li className="flex items-center gap-1 border-2 border-ink bg-white px-3 py-1">
                <FaYoutube aria-hidden="true" className="text-youtube" />{" "}
                {videos.length} videos
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="max-w-[65ch] space-y-4 text-lg leading-relaxed">
        <h2 className="text-3xl font-black uppercase">My story</h2>
        <p>
          I grew up in Yangon, Myanmar, but currently, I live in Singapore,
          working as a web developer. I&apos;ve always loved tech, gadgets, and
          finding better ways to get things done.
        </p>
        <p>
          For years, journaling never stuck for me, until I switched to a small
          A6 pocket notebook. Now it&apos;s how I keep track of my life, my
          habits, and my ideas. I started my channel and this site to document
          that journey: the notebooks, the gear, the tech, and the small systems
          that help me live a bit more intentionally.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-black uppercase">Away from the desk</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {HOBBIES.map((hobby) => (
            <li
              key={hobby.label}
              className={`border-2 border-ink px-4 py-2 text-lg font-black uppercase ${hobby.color}`}
            >
              <span aria-hidden="true">{hobby.emoji}</span> {hobby.label}
            </li>
          ))}
        </ul>
      </section>

      {topics.length > 0 && (
        <section>
          <h2 className="text-3xl font-black uppercase">
            What you&apos;ll find here
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={topic.href}
                  className={`block h-full border-4 border-ink p-5 shadow-brutal transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${topic.color}`}
                >
                  <span className="text-xl font-black uppercase">
                    {topic.label} →
                  </span>
                  <span className="mt-1 block font-bold">
                    {CATEGORY_BLURBS[topic.slug]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-4 border-ink bg-white p-6 shadow-brutal sm:p-10">
        <h2 className="text-3xl font-black uppercase">Get in touch</h2>
        <p className="mt-4 max-w-[50ch] text-lg">
          Want to say hi, share your own setup, or work together? I&apos;d love
          to hear from you.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href={`mailto:${SITE.email}`}>
            <FaEnvelope
              aria-hidden="true"
              className="mr-2 inline align-[-0.15em]"
            />
            Email me
          </Button>
          <Button href={SITE.youtubeUrl} variant="secondary" external>
            <FaYoutube
              aria-hidden="true"
              className="mr-2 inline align-[-0.15em] text-youtube"
            />
            YouTube <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>
        </div>
        <p className="mt-4 break-all text-sm font-bold sm:break-normal">
          {SITE.email}
        </p>
      </section>
    </Container>
  );
}
