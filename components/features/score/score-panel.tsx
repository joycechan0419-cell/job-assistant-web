"use client";

import { Award, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "./score-ring";
import { DimensionBar } from "./dimension-bar";
import { GapList } from "./gap-list";
import { useWizardStore } from "@/store/use-wizard-store";

export function ScorePanel() {
  const scoreResult = useWizardStore((s) => s.scoreResult);
  const status = useWizardStore((s) => s.status.score);
  const score = useWizardStore((s) => s.score);
  const rescoreAction = useWizardStore((s) => s.rescoreAction);
  const scoreHistory = useWizardStore((s) => s.scoreHistory);

  if (!scoreResult) {
    return (
      <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 bg-pixel-yellow/10 border-2 border-pixel-yellow flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-pixel-yellow" />
          </div>
          <div>
            <div className="text-[10px] text-pixel-yellow font-mono uppercase tracking-widest mb-1">
              [ F3 · SCORE ]
            </div>
            <h2 className="text-base font-bold uppercase tracking-wider text-pixel-text">
              开始匹配打分
            </h2>
            <p className="text-xs text-pixel-mute mt-1 leading-relaxed">
              基于润色版文书 + 目标 JD，给出 0-100 综合分 + 维度拆解 + 缺口清单
            </p>
          </div>
        </div>
        <Button
          onClick={score}
          size="lg"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "正在打分…" : "[ SCAN ] 开始匹配打分"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 主打分卡 */}
      <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-pixel-yellow/10 border-2 border-pixel-yellow flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-pixel-yellow" />
            </div>
            <div>
              <div className="text-[10px] text-pixel-yellow font-mono uppercase tracking-widest mb-1">
                [ F3 · RESULT ]
              </div>
              <h2 className="text-base font-bold uppercase tracking-wider text-pixel-text">
                简历与岗位匹配度
              </h2>
              <p className="text-xs text-pixel-mute mt-1 font-mono">
                命中 {scoreResult.matchedCount} / {scoreResult.reqTotal} 项必备技能
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                scoreResult.total >= 75
                  ? "ok"
                  : scoreResult.total >= 60
                  ? "soft"
                  : "hard"
              }
            >
              {scoreResult.total >= 75
                ? "✓ 良好 · 建议投递"
                : scoreResult.total >= 60
                ? "中等 · 需补强"
                : "较弱 · 建议优化"}
            </Badge>
            <Button
              variant="secondary"
              size="sm"
              onClick={rescoreAction}
              disabled={status === "loading"}
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${status === "loading" ? "animate-spin" : ""}`}
              />
              重新打分
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <ScoreRing value={scoreResult.total} />
          </div>
          <div>
            <DimensionBar
              label="技能匹配"
              value={scoreResult.skillScore}
              weight={scoreResult.weights.skill}
              icon="[ • ]"
            />
            <DimensionBar
              label="经历匹配"
              value={scoreResult.expScore}
              weight={scoreResult.weights.exp}
              icon="[ • ]"
            />
            <DimensionBar
              label="软素质匹配"
              value={scoreResult.softScore}
              weight={scoreResult.weights.soft}
              icon="[ • ]"
            />
          </div>
        </div>
      </div>

      {/* 缺口清单 */}
      <div className="bg-pixel-card border-2 border-pixel-line rounded-none p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 bg-pixel-yellow/10 border-2 border-pixel-yellow flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-pixel-yellow" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-pixel-text">
              缺口清单 · 投递前可补足
            </h3>
            <p className="text-[10px] text-pixel-mute mt-1 font-mono">
              按重要度排序 · 高优项对匹配分影响最大
            </p>
          </div>
        </div>
        <GapList gaps={scoreResult.gaps} />
      </div>

      {/* 智能建议 */}
      <div className="bg-pixel-yellow/10 border-2 border-pixel-yellow rounded-none p-5">
        <h4 className="text-sm font-bold uppercase tracking-widest text-pixel-yellow mb-2 flex items-center gap-2">
          <span>[ TIP ]</span>
          <span>智能建议</span>
        </h4>
        <ul className="space-y-1.5 text-sm text-pixel-text leading-relaxed">
          <li>
            当前综合分 <strong className="text-pixel-yellow">{scoreResult.total}</strong>
            {scoreResult.total >= 75
              ? "，已达到建议投递门槛（≥75），可以直接投递。"
              : "，建议补充高优缺口项后再投递。"}
          </li>
          {scoreResult.gaps.filter((g) => g.imp === "hi").length > 0 && (
            <li>
              优先补强{" "}
              <strong className="text-pixel-yellow">
                {scoreResult.gaps.filter((g) => g.imp === "hi")[0].name}
              </strong>
              ，预计可提升 5-8 分。
            </li>
          )}
          {scoreHistory.length > 1 && (
            <li className="font-mono text-xs text-pixel-mute">
              [ LOG ] 当前会话已打分 {scoreHistory.length} 次
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
