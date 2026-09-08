"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/store/use-wizard-store";

export function ExportPanel() {
  const optResult = useWizardStore((s) => s.optResult);
  const scoreResult = useWizardStore((s) => s.scoreResult);
  const copyPolished = useWizardStore((s) => s.copyPolished);
  const downloadReport = useWizardStore((s) => s.downloadReport);
  const reset = useWizardStore((s) => s.reset);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!optResult || !scoreResult) return null;

  return (
    <div className="bg-pixel-card border-2 border-pixel-yellow rounded-none p-6">
      <div className="flex items-center gap-3 mb-2 border-b-2 border-pixel-line pb-3">
        <div className="w-9 h-9 bg-pixel-yellow/10 border-2 border-pixel-yellow flex items-center justify-center shrink-0">
          <Send className="w-4 h-4 text-pixel-yellow" />
        </div>
        <div>
          <div className="text-[10px] text-pixel-yellow font-mono uppercase tracking-widest mb-1">
            [ F4 · EXPORT ]
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-text">
            导出与下一步
          </h3>
        </div>
      </div>
      <p className="text-xs text-pixel-mute mb-5 font-mono leading-relaxed">
        复制润色稿到投递平台 / 下载完整匹配报告 / 解析下一个 JD
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button variant="default" onClick={copyPolished} className="w-full">
          <Copy className="w-4 h-4" />
          复制润色稿
        </Button>
        <Button variant="secondary" onClick={downloadReport} className="w-full">
          <Download className="w-4 h-4" />
          下载报告
        </Button>
        <Button
          variant="secondary"
          onClick={() => setConfirmReset(true)}
          className="w-full"
        >
          <RefreshCw className="w-4 h-4" />
          解析新 JD
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => window.open("https://www.zhipin.com", "_blank")}
        >
          <Send className="w-4 h-4" />
          去投递
        </Button>
      </div>

      {confirmReset && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setConfirmReset(false)}
        >
          <div
            className="bg-pixel-card border-2 border-pixel-red rounded-none max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-red mb-3 border-b-2 border-pixel-line pb-3">
              [ CONFIRM ] 确认重置？
            </h3>
            <p className="text-sm text-pixel-sub mb-5 leading-relaxed">
              所有输入的 JD、简历、作品集和当前的解析结果都将清空，无法恢复。
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setConfirmReset(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                }}
                className="flex-1"
              >
                确认重置
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
