import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-sun",
  secondary: "bg-white",
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block border-4 border-ink px-5 py-2 font-black uppercase shadow-brutal transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
