"use client";

import { useState } from "react";
import { Check, Copy, FileEdit, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuggestionCard } from "./suggestion-card";
import { useWizardStore } from "@/store/use-wizard-store";

export function OptimizerResult() {
  const optResult = useWizardStore((s) => s.optResult);
  const copyPolished = useWizardStore((s) => s.copyPolished);
  const [copied, setCopied] = useState(false);

  if (!optResult) return null;

  const handleCopy = async () => {
    await copyPolished();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      {/* 顶部摘要 */}
      <div className="bg-pixel-card border-2 border-pixel-green rounded-none p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <div className="text-[10px] text-pixel-mute uppercase tracking-widest font-mono">
              MATCHED
            </div>
            <div className="text-2xl font-extrabold text-pixel-green tabular-nums">
              {optResult.matched.length}
            </div>
          </div>
          <div className="h-10 w-px bg-pixel-line" />
          <div>
            <div className="text-[10px] text-pixel-mute uppercase tracking-widest font-mono">
              MISSING
            </div>
            <div className="text-2xl font-extrabold text-pixel-yellow tabular-nums">
              {optResult.missing.length}
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex flex-wrap gap-1.5 max-w-md">
            {optResult.matched.length > 0 ? (
              optResult.matched.map((m) => (
                <span
                  key={m}
                  className="text-[10px] px-2 py-1 rounded-none border-2 border-pixel-green bg-status-okBg/40 text-pixel-green font-bold uppercase tracking-wider font-mono"
                >
                  ▶ {m}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-pixel-mute font-mono">
                未命中任何关键词
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 改写建议列表 */}
      <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-yellow flex items-center gap-2 mb-4 border-b-2 border-pixel-line pb-3">
          <FileEdit className="w-4 h-4" />
          改写建议 · {optResult.suggestions.length} 条
        </h3>
        <div className="space-y-3">
          {optResult.suggestions.map((s, i) => (
            <SuggestionCard key={i} index={i} suggestion={s} />
          ))}
        </div>
      </div>

      {/* 作品集建议 */}
      <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-yellow flex items-center gap-2 mb-3 border-b-2 border-pixel-line pb-3">
          <Palette className="w-4 h-4" />
          作品集结构建议
        </h3>
        <ul className="space-y-2">
          {optResult.portfolioTips.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-pixel-sub leading-relaxed"
            >
              <span className="text-pixel-yellow mt-0.5">▍</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 润色稿 */}
      <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
        <div className="flex items-center justify-between mb-3 border-b-2 border-pixel-line pb-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-text">
            润色稿（可直接复制）
          </h3>
          <Button size="sm" variant="default" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                复制润色稿
              </>
            )}
          </Button>
        </div>
        <pre className="bg-pixel-bg border-2 border-pixel-line rounded-none p-4 text-sm text-pixel-text leading-relaxed whitespace-pre-wrap font-mono max-h-96 overflow-y-auto scrollbar-thin">
          {optResult.polished}
        </pre>
      </div>
    </div>
  );
}
