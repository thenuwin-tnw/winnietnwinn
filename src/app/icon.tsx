import { brandIcon } from "@/lib/brand-icon";

// Browser-tab icon. Next.js turns this file into <link rel="icon"> automatically.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return brandIcon(size.width);
}
