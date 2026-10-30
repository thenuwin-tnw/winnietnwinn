import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type PhotoFrameProps = {
  src: string; // path inside public/, e.g. "/me.jpg"
  position?: string; // Tailwind object-position class to choose which part of a non-square photo shows
};

// Slightly tilted, like a photo stuck into a notebook. Used on the home and About heroes.
// If the photo file is missing, the "W" mark shows instead.
export default function PhotoFrame({ src, position = "object-center" }: PhotoFrameProps) {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", src));

  return (
    <div className="relative size-40 shrink-0 -rotate-3 overflow-hidden border-4 border-ink bg-sun shadow-brutal sm:size-52">
      {hasPhoto ? (
        <Image src={src} alt="Winnie" fill priority sizes="208px" className={`object-cover ${position}`} />
      ) : (
        <span aria-hidden="true" className="flex h-full items-center justify-center text-9xl font-black">
          W
        </span>
      )}
    </div>
  );
}
