"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaYoutube } from "react-icons/fa";
import Container from "@/components/Container";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b-4 border-ink bg-paper">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-2xl font-black uppercase">
          {SITE.name}
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <nav aria-label="Main">
            <ul className="flex flex-wrap gap-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block border-2 border-ink px-3 py-1 font-bold uppercase ${
                        isActive ? "bg-sun" : "bg-paper hover:bg-sun"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Kept apart from the nav: it leaves the site rather than moving around it. */}
          <a
            href={SITE.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube channel (opens in a new tab)"
            className="flex size-9 items-center justify-center border-2 border-ink bg-white text-xl text-youtube shadow-brutal-sm transition-transform hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-none"
          >
            <FaYoutube aria-hidden="true" />
          </a>
        </div>
      </Container>
    </header>
  );
}
