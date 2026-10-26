import Container from "@/components/Container";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="py-12">
      <Container>
        <div className="border-4 border-ink bg-blue p-6 shadow-brutal">
          <h1 className="text-4xl font-black uppercase">My Site</h1>
          <p className="mt-2 font-bold">A catalog of my videos and a blog.</p>
          <div className="mt-6 flex gap-4">
            <Button href="/videos">Watch videos</Button>
            <Button href="/blog" variant="secondary">
              Read the blog
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
