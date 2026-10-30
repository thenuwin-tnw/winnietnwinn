import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container className="py-12">
      <h1 className="text-4xl font-black uppercase">About</h1>
      <p className="mt-4 font-bold">Coming soon.</p>
    </Container>
  );
}
