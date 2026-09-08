import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="relative bg-pixel-bg border-b-2 border-pixel-yellow">
      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <div className="inline-flex items-center gap-2 bg-pixel-card border-2 border-pixel-line px-3 py-1.5 text-[10px] uppercase tracking-widest text-pixel-mute">
          <Sparkles className="w-3.5 h-3.5 text-pixel-yellow" />
          <span className="font-mono">PRD v1.3 · MVP · 规则引擎</span>
        </div>

        <h1 className="mt-5 pixel-text text-xl md:text-2xl text-pixel-text leading-relaxed">
          设计师求职文书 <span className="text-pixel-yellow">AI 助手</span>
        </h1>

        <p className="mt-4 text-sm text-pixel-sub max-w-2xl leading-relaxed">
          把「岗位 JD → 简历 / 作品集 → 投递」的文书链路，用 AI 快速做精准匹配与润色。
        </p>

        <div className="mt-5 inline-flex items-center gap-2 bg-pixel-yellow/10 border-2 border-pixel-yellow text-pixel-yellow px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest">
          <span>[ NOTICE ]</span>
          <span>本 Demo 使用规则引擎模拟（不调用真实 LLM）</span>
        </div>
      </div>
    </header>
  );
}
