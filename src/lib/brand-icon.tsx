import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// The site's letter mark: a heavy "W" on sun yellow with a thick black border.
// Icons are images, not web pages, so Tailwind classes don't apply here; colors match globals.css.
const SUN = "#ffd84d";
const INK = "#111111";

// The icon generator only ships a regular-weight font, so load Geist Black (OFL licensed) for a bold mark.
const FONT_PATH = path.join(process.cwd(), "src", "assets", "fonts", "Geist-Black.ttf");

export async function brandIcon(size: number) {
  const font = await fs.readFile(FONT_PATH);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: SUN,
          border: `${Math.round(size / 10)}px solid ${INK}`,
          color: INK,
          fontFamily: "Geist",
          fontSize: size * 0.72,
          lineHeight: 1,
        }}
      >
        W
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Geist", data: font, weight: 900, style: "normal" }],
    },
  );
}
