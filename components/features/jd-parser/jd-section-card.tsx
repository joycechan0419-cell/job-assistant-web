"use client";

import { ListChecks, Star, Heart, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ICONS = {
  resp: ListChecks,
  req: Star,
  plus: Heart,
  hr: Users,
};

const SWATCHES: Record<"resp" | "req" | "plus" | "hr", string> = {
  resp: "bg-pixel-yellow",
  req: "bg-pixel-red",
  plus: "bg-pixel-green",
  hr: "bg-pixel-blue",
};

export interface JdSectionCardProps {
  type: "resp" | "req" | "plus" | "hr";
  title: string;
  items: ReactNode[];
  hint?: string;
  className?: string;
}

const toneMap: Record<JdSectionCardProps["type"], string> = {
  resp: "border-l-pixel-yellow",
  req: "border-l-pixel-red",
  plus: "border-l-pixel-green",
  hr: "border-l-pixel-blue",
};

export function JdSectionCard({ type, title, items, hint, className }: JdSectionCardProps) {
  const Icon = ICONS[type];
  return (
    <div
      className={cn(
        "rounded-none bg-pixel-card border-2 border-pixel-line border-l-4 p-4",
        toneMap[type],
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("w-3 h-3", SWATCHES[type])} />
        <Icon className="w-4 h-4 text-pixel-text" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-pixel-text">
          {title}
        </h4>
        {hint && (
          <span className="text-[10px] text-pixel-mute font-mono ml-auto">
            {hint}
          </span>
        )}
      </div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li
            key={i}
            className="text-sm text-pixel-sub leading-relaxed"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
