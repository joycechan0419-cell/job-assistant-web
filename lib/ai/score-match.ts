/**
 * F3 · 简历-岗位匹配打分（demo 342-363 行移植）
 * REAL_MODEL_INTEGRATION_POINT: replace with MiniMax/OpenAI call
 */
import { sleep } from "@/lib/utils";
import { findSkills, splitClauses, normalize } from "./text-utils";
import { EXP_WORDS, SOFT_WORDS } from "./dictionary";
import type { Gap, ScoreResult, JdParseResult } from "@/types/domain";
import { parseJdSync } from "./parse-jd";

/** 权重配置（demo 默认 0.5 / 0.3 / 0.2） */
export const SCORE_WEIGHTS = {
  skill: 0.5,
  exp: 0.3,
  soft: 0.2,
} as const;

/**
 * 夹紧到 [0, 100]
 */
function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * 打分（demo 342-363 行）
 */
export function scoreMatchSync(
  resume: string,
  portfolio: string,
  jdResult: JdParseResult
): ScoreResult {
  const allText = `${resume}\n${portfolio}`;
  const lower = normalize(allText);

  // 技能匹配分：必备技能命中率 × 100
  const required = jdResult.required;
  const matchedRequired = required.filter((s) =>
    lower.includes(s.name.toLowerCase())
  );
  const matchedOptional = jdResult.plus.filter((s) =>
    lower.includes(s.name.toLowerCase())
  );

  const skillScore = required.length === 0
    ? 70
    : clamp(Math.round((matchedRequired.length / required.length) * 100));

  // 经历匹配分：简历中描述项目经历的句子数 × 表现力
  const expClauses = splitClauses(allText).filter((c) =>
    EXP_WORDS.some((w) => lower.includes(w.toLowerCase())) &&
    c.length > 12
  );
  const expScore = clamp(
    Math.min(100, Math.round(expClauses.length * 18 + matchedRequired.length * 6))
  );

  // 软素质匹配分：协作 / 沟通 / 跨团队关键词命中
  const softHits = SOFT_WORDS.filter((w) => lower.includes(w.toLowerCase()));
  const softScore = clamp(Math.round(60 + softHits.length * 8));

  // 综合分 = 加权平均
  const total = clamp(
    Math.round(
      skillScore * SCORE_WEIGHTS.skill +
        expScore * SCORE_WEIGHTS.exp +
        softScore * SCORE_WEIGHTS.soft
    )
  );

  // 缺口清单：高优（必备未命中）+ 中优（加分未命中）
  const gaps: Gap[] = [
    ...required
      .filter((s) => !matchedRequired.find((m) => m.name === s.name))
      .map((s) => ({ name: s.name, imp: "hi" as const })),
    ...jdResult.plus
      .filter((s) => !matchedOptional.find((m) => m.name === s.name))
      .map((s) => ({ name: s.name, imp: "mid" as const })),
  ].slice(0, 8);

  return {
    total,
    skillScore,
    expScore,
    softScore,
    weights: { ...SCORE_WEIGHTS },
    gaps,
    matchedCount: matchedRequired.length + matchedOptional.length,
    reqTotal: required.length,
  };
}

/** 异步版本（带 UI 延迟） */
export async function scoreMatch(
  resume: string,
  portfolio: string,
  jdText: string
): Promise<ScoreResult> {
  // REAL_MODEL_INTEGRATION_POINT: replace with MiniMax/OpenAI call
  await sleep(600);
  const jdResult = parseJdSync(jdText);
  return scoreMatchSync(resume, portfolio, jdResult);
}

/** 重新打分（修改材料后用户点"重新打分"） */
export async function rescore(
  resume: string,
  portfolio: string,
  jdResult: JdParseResult
): Promise<ScoreResult> {
  await sleep(400);
  return scoreMatchSync(resume, portfolio, jdResult);
}
