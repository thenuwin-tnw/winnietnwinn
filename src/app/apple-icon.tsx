import { brandIcon } from "@/lib/brand-icon";

// Used when someone adds the site to their iPhone/iPad home screen.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return brandIcon(size.width);
}
