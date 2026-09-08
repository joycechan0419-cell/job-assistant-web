"use client";

import { FileSearch, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useWizardStore } from "@/store/use-wizard-store";

export function JdInputPanel() {
  const jdText = useWizardStore((s) => s.jdText);
  const status = useWizardStore((s) => s.status.parse);
  const setJdText = useWizardStore((s) => s.setJdText);
  const loadSampleJD = useWizardStore((s) => s.loadSampleJD);
  const parseJdAction = useWizardStore((s) => s.parseJdAction);

  const isLoading = status === "loading";

  return (
    <div className="space-y-4">
      <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 bg-pixel-yellow/10 border-2 border-pixel-yellow flex items-center justify-center shrink-0">
            <FileSearch className="w-4 h-4 text-pixel-yellow" />
          </div>
          <div>
            <div className="text-[10px] text-pixel-yellow font-mono uppercase tracking-widest mb-1">
              [ F1 · INPUT ]
            </div>
            <h2 className="text-base font-bold uppercase tracking-wider text-pixel-text">
              把目标岗位 JD 丢进来
            </h2>
            <p className="text-xs text-pixel-mute mt-1 leading-relaxed">
              我会帮你拆解为 4 块结构化信息：核心职责 / 必备技能 / 加分项 / HR 考察点
            </p>
          </div>
        </div>

        <Textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="在此粘贴目标岗位 JD，例如：&#10;&#10;我们正在招聘一位高级 UI 设计师，加入我们蓬勃发展的设计团队。&#10;&#10;【职责】&#10;1. 负责公司核心产品的交互与视觉设计...&#10;2. 与 PM、研发紧密协作..."
          rows={14}
        />

        <div className="flex items-center justify-between mt-5 gap-2">
          <Button variant="ghost" onClick={loadSampleJD} disabled={isLoading}>
            [ LOAD ] 示例 JD
          </Button>
          <Button
            onClick={parseJdAction}
            disabled={isLoading || jdText.trim().length < 20}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                正在解析…
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                [ RUN ] 解析 JD
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
