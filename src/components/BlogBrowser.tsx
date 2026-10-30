"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { CATEGORIES, VIDEO_FILTER, isCategorySlug } from "@/lib/categories";
import type { PostMeta } from "@/lib/posts";
import PostGrid from "./PostGrid";

const FILTERS = [VIDEO_FILTER, ...CATEGORIES];

// Search + category filter for the blog list. State lives in the URL
// (/blog?category=tech&q=notion) so filtered views can be shared and the back button works.
export default function BlogBrowser({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryParam = searchParams.get("category") ?? "";
  const activeCategory =
    categoryParam === VIDEO_FILTER.slug || isCategorySlug(categoryParam) ? categoryParam : "";

  // The input keeps its own state so typing stays instant; the URL follows along.
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function hrefWith(changes: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function handleSearch(value: string) {
    setQuery(value);
    router.replace(hrefWith({ q: value.trim() }), { scroll: false });
  }

  const search = query.trim().toLowerCase();
  const visiblePosts = posts.filter((post) => {
    if (activeCategory === VIDEO_FILTER.slug && !post.youtubeId) return false;
    if (isCategorySlug(activeCategory) && !post.categories.includes(activeCategory)) return false;
    if (!search) return true;
    return `${post.title} ${post.description}`.toLowerCase().includes(search);
  });

  return (
    <>
      <label className="block">
        <span className="sr-only">Search posts</span>
        <input
          type="search"
          value={query}
          onChange={(event) => handleSearch(event.target.value)}
          placeholder="Search posts..."
          className="w-full border-4 border-ink bg-white px-4 py-3 font-bold shadow-brutal-sm outline-none focus:bg-sun/30"
        />
      </label>

      <nav aria-label="Filter by category" className="mt-4">
        <ul className="flex flex-wrap gap-2">
          <li>
            <FilterLink href={hrefWith({ category: "" })} active={!activeCategory} color="bg-paper">
              All
            </FilterLink>
          </li>
          {FILTERS.map((filter) => (
            <li key={filter.slug}>
              <FilterLink
                href={hrefWith({ category: filter.slug })}
                active={activeCategory === filter.slug}
                color={filter.color}
              >
                {filter.slug === VIDEO_FILTER.slug && <FaPlay aria-hidden="true" />}
                {filter.label}
              </FilterLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8">
        {visiblePosts.length > 0 ? (
          <PostGrid posts={visiblePosts} />
        ) : (
          <p className="font-bold">No posts match. Try another search or category.</p>
        )}
      </div>
    </>
  );
}

type FilterLinkProps = {
  href: string;
  active: boolean;
  color: string;
  children: React.ReactNode;
};

function FilterLink({ href, active, color, children }: FilterLinkProps) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      // Same language as Button: raised (shadow) = pressable, sunk into its shadow = pressed.
      className={`inline-flex items-center gap-1 border-2 border-ink px-3 py-1 text-sm font-bold uppercase transition-transform ${color} ${
        active
          ? "translate-x-0.75 translate-y-0.75 underline decoration-2"
          : "shadow-brutal-sm hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-none"
      }`}
    >
      {children}
    </Link>
  );
}
