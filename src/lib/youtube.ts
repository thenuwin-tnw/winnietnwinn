// Accepts a bare video ID ("GXbZc1sHEJY") or any common YouTube link
// (youtu.be/ID, youtube.com/watch?v=ID, /shorts/ID, /embed/ID) and returns the ID.
export function parseYouTubeId(value: string): string | undefined {
  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return undefined;
  }

  if (url.hostname === "youtu.be") return url.pathname.slice(1) || undefined;

  const fromQuery = url.searchParams.get("v");
  if (fromQuery) return fromQuery;

  const match = url.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{11})/);
  return match?.[1];
}
