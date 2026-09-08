"use client";

import { FileText, Image as ImageIcon, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useWizardStore } from "@/store/use-wizard-store";

export function OptimizerInputPanel() {
  const resumeText = useWizardStore((s) => s.resumeText);
  const portfolioText = useWizardStore((s) => s.portfolioText);
  const status = useWizardStore((s) => s.status.optimize);
  const setResumeText = useWizardStore((s) => s.setResumeText);
  const setPortfolioText = useWizardStore((s) => s.setPortfolioText);
  const loadSampleDocs = useWizardStore((s) => s.loadSampleDocs);
  const optimize = useWizardStore((s) => s.optimize);

  const isLoading = status === "loading";

  return (
    <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 bg-pixel-green/10 border-2 border-pixel-green flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-pixel-green" />
        </div>
        <div>
          <div className="text-[10px] text-pixel-green font-mono uppercase tracking-widest mb-1">
            [ F2 · INPUT ]
          </div>
          <h2 className="text-base font-bold uppercase tracking-wider text-pixel-text">
            上传你的求职文书
          </h2>
          <p className="text-xs text-pixel-mute mt-1 leading-relaxed">
            简历 + 作品集 都可填写。我会对照 JD 帮你逐条优化
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-widest text-pixel-text flex items-center gap-2 mb-2">
            <FileText className="w-3.5 h-3.5 text-pixel-green" />
            简历
          </label>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="粘贴你的简历内容（简介 / 工作经历 / 项目经历 / 技能 / 教育）"
            rows={10}
          />
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-widest text-pixel-text flex items-center gap-2 mb-2">
            <ImageIcon className="w-3.5 h-3.5 text-pixel-yellow" />
            作品集文案
          </label>
          <Textarea
            value={portfolioText}
            onChange={(e) => setPortfolioText(e.target.value)}
            placeholder="粘贴作品集的项目说明（项目名 / 角色 / 做了什么 / 带来什么结果）"
            rows={6}
          />
        </div>

        <div className="flex items-center justify-between pt-2 gap-2">
          <Button variant="ghost" onClick={loadSampleDocs} disabled={isLoading}>
            [ LOAD ] 一键载入示例数据
          </Button>
          <Button
            onClick={optimize}
            disabled={isLoading || resumeText.trim().length < 10}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                正在优化…
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                [ RUN ] 生成优化建议
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
