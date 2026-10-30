import type { Video } from "@/lib/videos";
import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {videos.map((video, index) => (
        <li key={video.id}>
          {/* The first row (2 cards on desktop) is visible without scrolling, so load those images right away. */}
          <VideoCard video={video} eager={index < 2} />
        </li>
      ))}
    </ul>
  );
}
