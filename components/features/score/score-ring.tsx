"use client";

import { cn } from "@/lib/utils";

export interface ScoreRingProps {
  value: number; // 0-100
  size?: number;
  className?: string;
}

export function ScoreRing({ value, size = 200, className }: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const strokeWidth = 12;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  // 12 个刻度（每 30°）
  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

  // 颜色按分数分段
  const ringColor =
    clamped >= 75 ? "#43A047" : clamped >= 60 ? "#FDD835" : "#E53935";

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth={strokeWidth}
        />
        {ticks.map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180;
          const inner = radius - strokeWidth;
          const outer = radius + strokeWidth;
          const x1 = center + Math.cos(rad) * inner;
          const y1 = center + Math.sin(rad) * inner;
          const x2 = center + Math.cos(rad) * outer;
          const y2 = center + Math.sin(rad) * outer;
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#4D4D4D"
              strokeWidth={1.5}
            />
          );
        })}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s steps(60)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="pixel-text text-3xl md:text-4xl tabular-nums" style={{ color: ringColor }}>
          {clamped}
        </div>
        <div className="text-[10px] text-pixel-mute mt-2 uppercase tracking-widest font-mono">
          综合匹配分
        </div>
        <div className="text-[10px] text-pixel-mute mt-0.5 font-mono">/ 100</div>
      </div>
    </div>
  );
}
