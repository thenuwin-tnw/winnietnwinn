// The fixed list of blog categories. To add one, add a line here.
// The order here is the order everywhere: filter bars and the About page cards.
// `color` must be a full Tailwind class so Tailwind can find it when scanning this file.
export const CATEGORIES = [
  { slug: "journaling", label: "Journaling", color: "bg-pink" }, // journaling, reflection
  { slug: "tech", label: "Tech", color: "bg-blue" }, // digital: software, coding, apps
  { slug: "gear", label: "Gear", color: "bg-lilac" }, // physical: desk setup, EDC, camera kit
  { slug: "productivity", label: "Productivity", color: "bg-sun" }, // workflows, systems, habits
  { slug: "life", label: "Life", color: "bg-mint" }, // everyday life, personal stories
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

// Not a real category: it's derived from `youtubeId`, so posts never need to list it.
export const VIDEO_FILTER = {
  slug: "video",
  label: "Video",
  color: "bg-accent text-white",
} as const;

export type FilterSlug = CategorySlug | typeof VIDEO_FILTER.slug;

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((category) => category.slug === value);
}

export function getCategory(slug: CategorySlug) {
  return CATEGORIES.find((category) => category.slug === slug)!;
}
