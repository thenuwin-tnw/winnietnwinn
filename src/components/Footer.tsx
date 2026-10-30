import Link from "next/link";
import { FaEnvelope, FaYoutube } from "react-icons/fa";
import Container from "@/components/Container";
import { NAV_LINKS, SITE } from "@/lib/site";

const socials = [
  { href: SITE.youtubeUrl, label: "YouTube", icon: FaYoutube, external: true, color: "text-youtube" },
  { href: `mailto:${SITE.email}`, label: `Email ${SITE.email}`, icon: FaEnvelope, external: false, color: "" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t-4 border-ink bg-blue">
      <Container className="grid gap-8 py-10 sm:grid-cols-2">
        <div>
          <p className="text-2xl font-black uppercase">{SITE.name}</p>
          <p className="mt-2 font-bold">{SITE.headline}</p>

          <ul className="mt-4 flex gap-3">
            {socials.map(({ href, label, icon: Icon, external, color }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  className={`flex size-11 items-center justify-center border-2 border-ink bg-white text-xl shadow-brutal-sm transition-transform hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-none ${color}`}
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:text-right">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 font-bold uppercase sm:justify-end">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-4 break-all text-sm font-bold sm:break-normal">
            <a href={`mailto:${SITE.email}`} className="hover:underline">
              {SITE.email}
            </a>
          </p>
          <p className="mt-2 text-sm">© {new Date().getFullYear()} {SITE.name}</p>
        </div>
      </Container>
    </footer>
  );
}
