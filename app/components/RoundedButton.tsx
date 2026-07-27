"use client";

import Magnetic from "./Magnetic";

type RoundedButtonProps = {
  children: React.ReactNode;
  href?: string;
  dark?: boolean;
  className?: string;
};

// Pill button whose accent fill sweeps up on hover.
export default function RoundedButton({ children, href, dark = false, className = "" }: RoundedButtonProps) {
  const base = dark
    ? "border-white/30 text-white"
    : "border-neutral-400/60 text-[var(--dark)]";
  const inner = (
    <span
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border px-9 py-4 text-sm font-medium transition-colors duration-300 hover:text-white ${base} ${className}`}
    >
      <span className="absolute inset-0 translate-y-full rounded-[50%_50%_0_0] bg-[var(--accent)] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-none" />
      <span className="relative z-10">{children}</span>
    </span>
  );

  return (
    <Magnetic>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {inner}
        </a>
      ) : (
        inner
      )}
    </Magnetic>
  );
}
