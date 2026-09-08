"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizardStore } from "@/store/use-wizard-store";
import type { Step } from "@/types/domain";

const STEPS: { id: Step; label: string; desc: string }[] = [
  { id: 1, label: "解析 JD", desc: "F1" },
  { id: 2, label: "上传材料", desc: "F2 输入" },
  { id: 3, label: "文书优化", desc: "F2 输出" },
  { id: 4, label: "匹配打分", desc: "F3" },
];

export function Stepper() {
  const currentStep = useWizardStore((s) => s.currentStep);
  const completed = useWizardStore((s) => s.completed);
  const goTo = useWizardStore((s) => s.goTo);

  return (
    <div className="bg-pixel-card border-2 border-pixel-line rounded-none px-4 py-3 mb-4">
      <div className="flex items-center gap-2">
        {STEPS.map((step, i) => {
          const isActive = currentStep === step.id;
          const isDone = completed[step.id];
          const canClick = isDone || step.id <= currentStep;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-initial"
            >
              <button
                onClick={() => canClick && goTo(step.id)}
                disabled={!canClick}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 border-2 transition-none",
                  canClick
                    ? "cursor-pointer hover:border-pixel-yellow"
                    : "cursor-not-allowed border-transparent",
                  isActive
                    ? "border-pixel-yellow bg-pixel-yellow/10"
                    : "border-transparent"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 flex items-center justify-center text-xs font-bold transition-none",
                    isDone
                      ? "bg-pixel-green text-pixel-bg"
                      : isActive
                      ? "bg-pixel-yellow text-pixel-bg"
                      : "bg-pixel-card border-2 border-pixel-line text-pixel-mute"
                  )}
                >
                  {isDone ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="text-left hidden sm:block">
                  <div
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-widest",
                      isActive
                        ? "text-pixel-yellow"
                        : isDone
                        ? "text-pixel-green"
                        : "text-pixel-mute"
                    )}
                  >
                    {step.label}
                  </div>
                  <div className="text-[10px] text-pixel-mute font-mono">
                    {step.desc}
                  </div>
                </div>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 transition-none",
                    completed[step.id] ? "bg-pixel-green" : "bg-pixel-line"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
