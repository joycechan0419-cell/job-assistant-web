"use client";

export interface DimensionBarProps {
  label: string;
  value: number; // 0-100
  weight: number; // 0-1
  icon?: string;
}

export function DimensionBar({ label, value, weight, icon }: DimensionBarProps) {
  const weightLabel = Math.round(weight * 100);
  const barColor =
    value >= 75 ? "bg-pixel-green" : value >= 60 ? "bg-pixel-yellow" : "bg-pixel-red";
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-pixel-text flex items-center gap-2">
          {icon && <span className="text-pixel-green">{icon}</span>}
          {label}
          <span className="text-[10px] text-pixel-mute font-mono font-normal">
            权重 {weightLabel}%
          </span>
        </span>
        <span className="text-[11px] font-bold text-pixel-yellow font-mono tabular-nums">
          {value} / 100
        </span>
      </div>
      <div className="h-2 bg-pixel-line overflow-hidden border-2 border-pixel-line">
        <div
          className={`h-full ${barColor} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
