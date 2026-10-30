import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import VideoBrowser from "@/components/VideoBrowser";
import VideoGrid from "@/components/VideoGrid";
import { getAllVideos } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Videos",
  description: "Every video from my YouTube channel.",
};

export default function VideosPage() {
  const videos = getAllVideos();

  return (
    <Container className="py-12">
      <h1 className="text-4xl font-black uppercase">Videos</h1>

      <div className="mt-8">
        {videos.length === 0 ? (
          <p className="font-bold">No videos yet. Check back soon!</p>
        ) : (
          // VideoBrowser reads the URL (?category=…&q=…), which only exists in the browser.
          // Until it loads, the fallback shows every video, so the static HTML still has them all.
          <Suspense fallback={<VideoGrid videos={videos} />}>
            <VideoBrowser videos={videos} />
          </Suspense>
        )}
      </div>
    </Container>
  );
}
