"use client";

import { cn } from "@/lib/utils";

export interface LoadingDotsProps {
  label?: string;
  className?: string;
}

export function LoadingDots({ label, className }: LoadingDotsProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 py-6", className)}>
      <div className="flex gap-1.5">
        <span
          className="inline-block w-2.5 h-2.5 bg-pixel-yellow animate-pixel-blink"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="inline-block w-2.5 h-2.5 bg-pixel-yellow animate-pixel-blink"
          style={{ animationDelay: "200ms" }}
        />
        <span
          className="inline-block w-2.5 h-2.5 bg-pixel-yellow animate-pixel-blink"
          style={{ animationDelay: "400ms" }}
        />
      </div>
      {label && (
        <p className="text-[11px] uppercase tracking-widest text-pixel-mute font-mono">
          {label}
        </p>
      )}
    </div>
  );
}
