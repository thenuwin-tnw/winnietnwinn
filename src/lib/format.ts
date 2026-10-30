// "2026-10-26" -> "Oct 26, 2026"
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC", // the date string is parsed as UTC midnight; keep it from shifting a day
  });
}
