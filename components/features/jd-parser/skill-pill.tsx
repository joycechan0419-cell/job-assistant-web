import { cn } from "@/lib/utils";

export interface SkillPillProps {
  name: string;
  matched?: boolean;
  className?: string;
}

export function SkillPill({ name, matched, className }: SkillPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-none border-2 text-[11px] font-bold uppercase tracking-wider transition-none font-mono",
        matched
          ? "bg-status-okBg/40 border-pixel-green text-pixel-green"
          : "bg-pixel-card border-pixel-line text-pixel-text",
        className
      )}
    >
      {matched ? (
        <span className="text-pixel-green mr-1.5">▶</span>
      ) : (
        <span className="text-pixel-mute mr-1.5">·</span>
      )}
      {name}
    </span>
  );
}
