/**
 * 生成匹配报告（demo 535-567 行移植）
 */
import type { JdParseResult, OptResult, ScoreResult } from "@/types/domain";

export function generateReport(
  jdResult: JdParseResult,
  optResult: OptResult,
  scoreResult: ScoreResult,
  jdText: string
): string {
  const lines: string[] = [];

  lines.push("═══════════════════════════════════════════════");
  lines.push("    设计师求职文书匹配报告");
  lines.push("═══════════════════════════════════════════════");
  lines.push("");
  lines.push(`生成时间：${new Date().toLocaleString("zh-CN")}`);
  lines.push(`目标岗位：${jdResult.role}`);
  lines.push("");

  // F1 解析
  lines.push("─────────────────────────────────────────────");
  lines.push("【F1 · JD 解析结果】");
  lines.push("─────────────────────────────────────────────");
  lines.push("");
  lines.push("▍核心职责：");
  jdResult.responsibilities.forEach((r, i) => {
    lines.push(`  ${i + 1}. ${r}`);
  });
  lines.push("");
  lines.push(`▍必备技能（${jdResult.required.length} 项）：`);
  jdResult.required.forEach((s) => {
    lines.push(`  · ${s.name}【硬门槛】`);
  });
  lines.push("");
  lines.push(`▍加分项（${jdResult.plus.length} 项）：`);
  jdResult.plus.forEach((s) => {
    lines.push(`  · ${s.name}【软考察】`);
  });
  lines.push("");
  lines.push("▍HR 核心考察点：");
  jdResult.hr.forEach((h) => {
    lines.push(`  · ${h}`);
  });
  lines.push("");

  // F2 优化
  lines.push("─────────────────────────────────────────────");
  lines.push("【F2 · 文书优化建议】");
  lines.push("─────────────────────────────────────────────");
  lines.push("");
  lines.push(`▍命中关键词：${optResult.matched.join("、") || "无"}`);
  lines.push(`▍待补强关键词：${optResult.missing.join("、") || "无"}`);
  lines.push("");
  lines.push("▍逐条改写建议：");
  optResult.suggestions.forEach((s, i) => {
    lines.push(`  ${i + 1}. 原句：${s.orig}`);
    lines.push(`     问题：${s.problem}`);
    lines.push(`     建议：${s.fix}`);
    lines.push("");
  });
  lines.push("▍作品集建议：");
  optResult.portfolioTips.forEach((t) => {
    lines.push(`  · ${t}`);
  });
  lines.push("");

  // F3 打分
  lines.push("─────────────────────────────────────────────");
  lines.push("【F3 · 匹配打分】");
  lines.push("─────────────────────────────────────────────");
  lines.push("");
  lines.push(`▍综合匹配分：${scoreResult.total} / 100`);
  lines.push(`▍技能匹配：${scoreResult.skillScore} / 100`);
  lines.push(`▍经历匹配：${scoreResult.expScore} / 100`);
  lines.push(`▍软素质匹配：${scoreResult.softScore} / 100`);
  lines.push("");
  lines.push(`▍权重：技能 ${Math.round(scoreResult.weights.skill * 100)}% · 经历 ${Math.round(scoreResult.weights.exp * 100)}% · 软素质 ${Math.round(scoreResult.weights.soft * 100)}%`);
  lines.push("");
  lines.push("▍缺口清单：");
  if (scoreResult.gaps.length === 0) {
    lines.push("  · 🎉 暂无明显缺口，建议立即投递！");
  } else {
    scoreResult.gaps.forEach((g) => {
      const label = g.imp === "hi" ? "高优" : "中优";
      lines.push(`  · [${label}] ${g.name}`);
    });
  }
  lines.push("");
  lines.push("─────────────────────────────────────────────");
  lines.push("本报告由「设计师求职文书 AI 助手」MVP Demo 生成");
  lines.push("仅供产品演示，不构成投递建议");
  lines.push("═══════════════════════════════════════════════");

  return lines.join("\n");
}
