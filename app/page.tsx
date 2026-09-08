"use client";

import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { Stepper } from "@/components/layout/stepper";
import { SiteFooter } from "@/components/layout/site-footer";
import { JdInputPanel } from "@/components/features/jd-parser/jd-input-panel";
import { JdResultGrid } from "@/components/features/jd-parser/jd-result-grid";
import { OptimizerInputPanel } from "@/components/features/doc-optimizer/optimizer-input-panel";
import { OptimizerResult } from "@/components/features/doc-optimizer/optimizer-result";
import { ScorePanel } from "@/components/features/score/score-panel";
import { ExportPanel } from "@/components/features/export/export-panel";
import { useWizardStore } from "@/store/use-wizard-store";

export default function HomePage() {
  const currentStep = useWizardStore((s) => s.currentStep);
  const jdResult = useWizardStore((s) => s.jdResult);
  const optResult = useWizardStore((s) => s.optResult);
  const goTo = useWizardStore((s) => s.goTo);
  const reset = useWizardStore((s) => s.reset);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Stepper />

        {/* Step 1: JD 解析 */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <JdInputPanel />
            {jdResult && (
              <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
                <div className="flex items-center justify-between mb-4 border-b-2 border-pixel-line pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-text">
                    [ RESULT ] 解析结果 · 当前匹配基准 JD
                  </h3>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    <RefreshCw className="w-3.5 h-3.5" />
                    重新开始
                  </Button>
                </div>
                <JdResultGrid result={jdResult} />
                <div className="flex justify-end mt-6 pt-4 border-t-2 border-pixel-line">
                  <Button onClick={() => goTo(2)} size="lg">
                    下一步：上传文书材料
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: 文书优化 */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <OptimizerInputPanel />
            {optResult && (
              <>
                <OptimizerResult />
                <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
                  <div className="flex items-center justify-between gap-2">
                    <Button variant="secondary" onClick={() => goTo(1)}>
                      <ChevronLeft className="w-4 h-4" />
                      上一步
                    </Button>
                    <Button onClick={() => goTo(3)} size="lg">
                      下一步：开始匹配打分
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: 匹配打分 */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <ScorePanel />
            <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
              <div className="flex items-center justify-between gap-2">
                <Button variant="secondary" onClick={() => goTo(2)}>
                  <ChevronLeft className="w-4 h-4" />
                  回到优化
                </Button>
                <div className="text-[10px] text-pixel-mute font-mono uppercase tracking-widest">
                  打分后可下载报告或去投递
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 导出 */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <ExportPanel />
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
