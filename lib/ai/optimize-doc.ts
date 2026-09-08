/**
 * F2 · 文书优化（demo 286-337 行移植）
 * REAL_MODEL_INTEGRATION_POINT: replace with MiniMax/OpenAI call
 */
import { sleep } from "@/lib/utils";
import { findSkills, splitClauses, normalize } from "./text-utils";
import { SKILL_DICT, SOFT_WORDS, EXP_WORDS } from "./dictionary";
import type { OptResult, Suggestion, JdParseResult } from "@/types/domain";
import { parseJdSync } from "./parse-jd";

/**
 * 同步版本的优化（demo 286-337 行）
 */
export function optimizeDocSync(
  resume: string,
  portfolio: string,
  jdResult: JdParseResult
): OptResult {
  const allSkills = jdResult.allSkills;
  const matched = findSkills(resume);
  const missing = allSkills.filter(
    (s) => !matched.includes(s)
  );

  // 提取简历中的"模糊"短句，生成改写建议
  const clauses = splitClauses(resume);
  const suggestions: Suggestion[] = [];

  // 命中"模糊"模式：太短（少于 12 字）、无量化数据
  const vagueClauses = clauses
    .filter((c) => c.length > 6 && c.length < 30)
    .slice(0, 6);

  vagueClauses.forEach((clause) => {
    const lower = normalize(clause);
    // 检测关键词
    const hasSpecificSkill = SKILL_DICT.some((s) => lower.includes(s.toLowerCase()));
    const hasQuantData = /\d|%/.test(clause);

    if (hasSpecificSkill && !hasQuantData) {
      suggestions.push({
        orig: clause,
        problem: "表述笼统，缺少量化数据，未体现业务影响。",
        fix: `建议补充：项目背景、完成时间、量化成果（如「转化率提升 X%」「节省 X 小时」）。原句：${clause}。`,
      });
    } else if (clause.length < 15) {
      suggestions.push({
        orig: clause,
        problem: "句子过短，缺乏说服力。",
        fix: `建议扩写：使用「主导/参与 X 项目」「负责 X 模块」「沉淀 X 资产」等动词短语明确贡献。`,
      });
    } else {
      suggestions.push({
        orig: clause,
        problem: "句子结构松散，可读性一般。",
        fix: `建议重构：先讲「做了什么」+「用了什么方法」+「带来什么结果」，用「→」连接形成清晰链路。`,
      });
    }
  });

  // 兜底：至少给出 3 条建议
  if (suggestions.length < 3) {
    const fillers = [
      {
        orig: "负责产品界面设计工作。",
        problem: "表达过于笼统，未体现胜任力。",
        fix: "建议改为：「主导 X 款核心产品的 UI 设计，覆盖需求分析 → 交互原型 → 视觉走查全流程」。",
      },
      {
        orig: "熟练使用 Figma、Sketch 等工具。",
        problem: "「熟练」缺少说服力，未呼应 JD 加分项。",
        fix: "建议改为：「精通 Figma（含 Auto Layout、组件库、Variables），熟悉 Principle 动效原型」。",
      },
      {
        orig: "改版了用户后台体验。",
        problem: "缺少量化数据。",
        fix: "建议改为：「主导后台改版，将核心流程从 8 步精简至 4 步，客服工单下降 32%，NPS 提升 18 分」。",
      },
    ];
    fillers.forEach((f) => suggestions.push(f));
  }

  // 限制 6 条
  const finalSuggestions = suggestions.slice(0, 6);

  // 作品集建议
  const portfolioTips: string[] = [
    "每个项目按「业务背景 → 机会洞察 → 设计策略 → 落地结果」四段式重写。",
    "把与目标岗位最相关的 2-3 个项目放在主展示位，弱化无关项目。",
    "为每个项目补充 1 张关键页面截图 + 1 段 200 字以内的「做了什么 + 带来了什么」。",
  ];

  // 润色稿（demo 286-337 行内 polished 模板）
  const matchedList = matched.length > 0 ? matched.join("、") : "设计基础能力";
  const missingList = missing.length > 0 ? missing.join("、") : "无明显缺口";
  const polished = `【小 A · 求职 ${jdResult.role} · 润色稿】

▍核心匹配
命中关键词：${matchedList}
待补强：${missingList}

▍个人概述
${resume.slice(0, 200)}…（建议在简介前 30 字就突出与本岗位最匹配的 1-2 项经验）

▍工作经历（按 JD 改造）
1. 主导/参与 X 款产品全流程设计（请按时间倒序，每条 3-5 行）；
2. 沉淀 X 个设计资产（如设计系统、组件库、模板）；
3. 跨团队协作 X 次（对接 PM/研发/运营），建立 X 机制。

▍项目亮点（挑 2-3 个最相关的）
- 项目 A：背景 + 机会 + 策略 + 结果（量化）；
- 项目 B：同上；
- 项目 C：同上。

▍作品集建议
${portfolioTips[0]}

（本润色稿为草稿版本，请基于真实经历编辑后再投递。）`;

  return {
    matched,
    missing,
    suggestions: finalSuggestions,
    portfolioTips,
    polished,
  };
}

/**
 * 异步版本（带 UI 延迟）
 */
export async function optimizeDoc(
  resume: string,
  portfolio: string,
  jdText: string
): Promise<OptResult> {
  // REAL_MODEL_INTEGRATION_POINT: replace with MiniMax/OpenAI call
  await sleep(800);
  const jdResult = parseJdSync(jdText);
  return optimizeDocSync(resume, portfolio, jdResult);
}

/** 重新优化（修改后用户点"重新优化"） */
export async function reoptimize(
  resume: string,
  portfolio: string,
  jdResult: JdParseResult
): Promise<OptResult> {
  await sleep(600);
  return optimizeDocSync(resume, portfolio, jdResult);
}
