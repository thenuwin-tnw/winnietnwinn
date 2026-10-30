import type { Metadata } from "next";
import Button from "@/components/Button";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "Page not found" };

// Next.js shows this for any URL that doesn't exist, and whenever a page calls notFound().
export default function NotFound() {
  return (
    <Container className="py-16">
      <section className="mx-auto max-w-xl border-4 border-ink bg-lilac p-8 text-center shadow-brutal sm:p-12">
        <p className="text-7xl font-black sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-black uppercase">This page isn&apos;t in my notebook</h1>
        <p className="mt-4 font-bold">
          It might have moved, or the link has a typo. Try one of these instead:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Go home</Button>
          <Button href="/videos" variant="secondary">
            Videos
          </Button>
          <Button href="/blog" variant="secondary">
            Blog
          </Button>
        </div>
      </section>
    </Container>
  );
}
