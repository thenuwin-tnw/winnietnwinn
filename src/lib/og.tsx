import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Link-preview images (what WhatsApp, X, Discord… show when a link is shared).
// They're drawn as images at build time, so Tailwind doesn't apply: colors match globals.css.
export const OG_SIZE = { width: 1200, height: 630 };

export const COLORS = {
  ink: "#111111",
  paper: "#ffffff",
  sun: "#ffd84d",
  blue: "#bae6ff",
  mint: "#7be0b5",
  pink: "#ff9ec7",
  lilac: "#c8b6ff",
};

const FONTS_DIR = path.join(process.cwd(), "src", "assets", "fonts");

async function loadFonts() {
  const [black, bold] = await Promise.all([
    fs.readFile(path.join(FONTS_DIR, "Geist-Black.ttf")),
    fs.readFile(path.join(FONTS_DIR, "Geist-Bold.ttf")),
  ]);
  return [
    { name: "Geist", data: black, weight: 900 as const, style: "normal" as const },
    { name: "Geist", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

// The photo as a data URL, so the image generator doesn't need to fetch anything.
async function loadPhoto() {
  try {
    const file = await fs.readFile(path.join(process.cwd(), "public", SITE.photo));
    return `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

// A brutalist card: colored background, thick black border, hard shadow-like offset frame.
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  background = COLORS.blue,
  showPhoto = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  background?: string;
  showPhoto?: boolean;
}) {
  const [fonts, photo] = await Promise.all([loadFonts(), showPhoto ? loadPhoto() : null]);
  const domain = new URL(SITE.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: COLORS.paper,
          padding: 40,
          fontFamily: "Geist",
          color: COLORS.ink,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 48,
            padding: "48px 56px",
            background,
            border: `10px solid ${COLORS.ink}`,
            boxShadow: `14px 14px 0 0 ${COLORS.ink}`,
          }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: title.length > 40 ? 64 : 80,
                fontWeight: 900,
                lineHeight: 1.05,
                textTransform: "uppercase",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ marginTop: 24, fontSize: 32, fontWeight: 700, lineHeight: 1.3 }}>
                {subtitle}
              </div>
            )}
            <div
              style={{
                marginTop: 36,
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 18px",
                background: COLORS.sun,
                border: `4px solid ${COLORS.ink}`,
                fontSize: 26,
                fontWeight: 900,
              }}
            >
              {domain}
            </div>
          </div>

          {photo && (
            <div
              style={{
                display: "flex",
                width: 340,
                height: 340,
                flexShrink: 0,
                border: `8px solid ${COLORS.ink}`,
                boxShadow: `10px 10px 0 0 ${COLORS.ink}`,
                transform: "rotate(-3deg)",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- this renders to a PNG, not a web page */}
              <img
                src={photo}
                alt=""
                width={453}
                height={340}
                style={{ objectFit: "cover", marginLeft: -73 }} // same 65% crop as the site
              />
            </div>
          )}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
