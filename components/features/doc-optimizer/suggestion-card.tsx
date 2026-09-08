"use client";

import { Check, Edit3 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Suggestion } from "@/types/domain";

export interface SuggestionCardProps {
  index: number;
  suggestion: Suggestion;
}

export function SuggestionCard({ index, suggestion }: SuggestionCardProps) {
  const [accepted, setAccepted] = useState(false);
  const hasOriginal = suggestion.orig && suggestion.orig.trim().length > 0;

  return (
    <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-pixel-yellow text-pixel-bg flex items-center justify-center text-xs font-bold font-mono">
            {index + 1}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-pixel-text">
            改写建议 #{index + 1}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setAccepted((a) => !a)}
            className={cn(
              "px-2.5 py-1 border-2 text-[10px] font-bold uppercase tracking-widest transition-none flex items-center gap-1",
              accepted
                ? "bg-pixel-green border-pixel-green text-pixel-bg"
                : "bg-transparent border-pixel-yellow text-pixel-yellow hover:bg-pixel-yellow/10"
            )}
          >
            <Check className="w-3 h-3" />
            {accepted ? "已采纳" : "采纳"}
          </button>
          <button className="px-2.5 py-1 border-2 border-pixel-line bg-pixel-bg text-pixel-mute text-[10px] font-bold uppercase tracking-widest hover:border-pixel-yellow hover:text-pixel-yellow transition-none flex items-center gap-1">
            <Edit3 className="w-3 h-3" />
            编辑
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {hasOriginal && (
          <div className="bg-status-hardBg/30 border-l-4 border-pixel-red rounded-none p-3">
            <Badge variant="hard" className="mb-1.5">
              原句
            </Badge>
            <p className="text-sm text-pixel-text leading-relaxed">
              {suggestion.orig}
            </p>
          </div>
        )}
        <div className="bg-status-softBg/30 border-l-4 border-pixel-yellow rounded-none p-3">
          <Badge variant="soft" className="mb-1.5">
            问题
          </Badge>
          <p className="text-sm text-pixel-text leading-relaxed">
            {suggestion.problem}
          </p>
        </div>
        <div className="bg-status-okBg/30 border-l-4 border-pixel-green rounded-none p-3">
          <Badge variant="ok" className="mb-1.5">
            建议
          </Badge>
          <p className="text-sm text-pixel-text leading-relaxed">
            {suggestion.fix}
          </p>
        </div>
      </div>
    </div>
  );
}
