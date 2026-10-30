import { OG_SIZE, renderOgImage } from "@/lib/og";
import { SITE } from "@/lib/site";

// The default link preview for every page (pages can override it with their own opengraph-image).
export const alt = `${SITE.name}: ${SITE.headline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({
    eyebrow: "Hi, I'm Winnie",
    title: SITE.name,
    subtitle: SITE.headline,
    showPhoto: true,
  });
}
