import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE, SITE_DESCRIPTION } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Pages that set their own title get "<title> | Winnie TN Winn" in the browser tab.
  // Link previews need full URLs; this turns relative image paths into https://… ones.
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  // "summary_large_image" = the big image card on X (instead of a small thumbnail).
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Hidden until a keyboard user presses Tab: lets them jump past the header. */}
        <a
          href="#main"
          className="sr-only border-4 border-ink bg-sun px-4 py-2 font-black uppercase shadow-brutal focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <Header />
        {/* One <main> for every page, so screen readers can jump straight to the content.
            flex-1 makes it fill the leftover height, which pushes the footer to the bottom.
            tabIndex={-1} lets the skip link move focus here. */}
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
