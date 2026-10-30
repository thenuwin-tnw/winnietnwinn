import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { VIDEO_FILTER, getCategory, type FilterSlug } from "@/lib/categories";

type CategoryChipProps = {
  slug: FilterSlug;
};

// A small colored label that links to the blog filtered by that category.
export default function CategoryChip({ slug }: CategoryChipProps) {
  const { label, color } = slug === VIDEO_FILTER.slug ? VIDEO_FILTER : getCategory(slug);

  return (
    <Link
      href={`/blog?category=${slug}`}
      className={`inline-flex items-center gap-1 border-2 border-ink px-2 py-0.5 text-xs font-bold uppercase hover:underline ${color}`}
    >
      {slug === VIDEO_FILTER.slug && <FaPlay aria-hidden="true" />}
      {label}
    </Link>
  );
}
