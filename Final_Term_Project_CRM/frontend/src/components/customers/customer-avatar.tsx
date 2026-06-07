"use client";

import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const avatarStyles = [
  "bg-[#111827] text-white",
  "bg-[#725cff] text-white",
  "bg-[#17c995] text-[#071915]",
  "bg-[#f6c85f] text-[#251b04]",
  "bg-[#f08a5d] text-[#241008]",
  "bg-[#dde5f3] text-[#1d2430]",
  "bg-[#f2d5f8] text-[#302033]",
  "bg-[#c8efdf] text-[#08251a]",
];

export function CustomerAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const index = name
    .split("")
    .reduce((total, letter) => total + letter.charCodeAt(0), 0) % avatarStyles.length;

  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full text-xs font-semibold shadow-sm",
        avatarStyles[index],
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
