import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  external?: boolean; // opens in a new tab (for links that leave the site)
  className?: string; // extra classes, e.g. for layout
};

const variants = {
  primary: "bg-sun",
  secondary: "bg-white",
};

// Each size pairs its shadow with a hover move of the same distance, so the button sinks exactly into it.
const sizes = {
  md: "border-4 px-5 py-2 shadow-brutal hover:translate-x-1 hover:translate-y-1",
  sm: "border-2 px-3 py-1.5 text-sm shadow-brutal-sm hover:translate-x-0.75 hover:translate-y-0.75",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-block border-ink font-black uppercase transition-transform hover:shadow-none ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
