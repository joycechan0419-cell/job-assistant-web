"use client";

import { Badge } from "@/components/ui/badge";

export type StatusTone = "hard" | "soft" | "ok" | "info" | "neutral" | "default";

const labelMap: Record<StatusTone, string> = {
  hard: "硬门槛",
  soft: "软考察",
  ok: "已命中",
  info: "提示",
  neutral: "未识别",
  default: "标签",
};

export interface StatusTagProps {
  tone: StatusTone;
  label?: string;
  className?: string;
}

export function StatusTag({ tone, label, className }: StatusTagProps) {
  return (
    <Badge variant={tone} className={className}>
      {label || labelMap[tone]}
    </Badge>
  );
}
