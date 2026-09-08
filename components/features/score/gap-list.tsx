"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Gap } from "@/types/domain";

export interface GapListProps {
  gaps: Gap[];
}

export function GapList({ gaps }: GapListProps) {
  if (gaps.length === 0) {
    return (
      <div className="bg-pixel-card border-2 border-pixel-green rounded-none p-6 text-center">
        <div className="pixel-text text-pixel-green text-2xl mb-2">[ OK ]</div>
        <div className="text-sm font-bold uppercase tracking-widest text-pixel-green">
          暂无明显缺口
        </div>
        <div className="text-xs text-pixel-mute mt-2 font-mono">
          你的材料已覆盖 JD 大部分要求，建议立即投递
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {gaps.map((g, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-3 p-3 border-2 border-pixel-line border-l-4 bg-pixel-card rounded-none",
            g.imp === "hi" ? "border-l-pixel-red" : "border-l-pixel-yellow"
          )}
        >
          <Badge
            variant={g.imp === "hi" ? "hard" : "soft"}
          >
            {g.imp === "hi" ? "高优" : "中优"}
          </Badge>
          <span className="text-sm text-pixel-text font-mono">{g.name}</span>
        </div>
      ))}
    </div>
  );
}
