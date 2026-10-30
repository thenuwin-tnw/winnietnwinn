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
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {/* One <main> for every page, so screen readers can jump straight to the content.
            flex-1 makes it fill the leftover height, which pushes the footer to the bottom. */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
