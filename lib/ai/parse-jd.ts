/**
 * F1 · JD 智能解析（demo 243-281 行移植）
 * REAL_MODEL_INTEGRATION_POINT: replace with MiniMax/OpenAI call
 */
import { sleep } from "@/lib/utils";
import { hasAny, splitClauses, normalize } from "./text-utils";
import { PLUS_WORDS, REQ_WORDS, RESP_WORDS, HR_WORDS, SKILL_DICT } from "./dictionary";
import type { JdParseResult, SkillTag } from "@/types/domain";

/**
 * 推断岗位方向（demo 275-281 行）
 */
export function inferRole(text: string): string {
  const t = normalize(text);
  if (hasAny(t, ["3d", "blender", "c4d", "spline"])) return "3D / 视觉设计师";
  if (hasAny(t, ["品牌", "插画", "brand"])) return "品牌设计师";
  if (hasAny(t, ["b 端", "b端", "saas", "tob", "to b", "dashboard", "后台"])) return "B 端 UI 设计师";
  if (hasAny(t, ["c 端", "c端", "电商", "增长"])) return "C 端产品设计师";
  if (hasAny(t, ["动效", "ae", "after effects", "principle"])) return "动效设计师";
  if (hasAny(t, ["交互", "ux", "用户研究"])) return "交互设计师";
  return "UI / 视觉设计师";
}

/**
 * 解析 JD 文本（demo 243-274 行）
 */
export function parseJdSync(text: string): JdParseResult {
  const clauses = splitClauses(text);
  const role = inferRole(text);

  // 核心职责：包含 RESP_WORDS 的句子
  const responsibilities = clauses
    .filter((c) => hasAny(c, RESP_WORDS))
    .slice(0, 6);

  // 必备技能：包含 REQ_WORDS 的句子中提到的技能
  const required: SkillTag[] = [];
  const plus: SkillTag[] = [];

  clauses.forEach((c) => {
    const lower = normalize(c);
    SKILL_DICT.forEach((skill) => {
      if (lower.includes(skill.toLowerCase())) {
        const tag: SkillTag = { name: skill, hard: false };
        if (hasAny(c, REQ_WORDS)) {
          tag.hard = true;
          if (!required.find((s) => s.name === skill)) required.push(tag);
        } else if (hasAny(c, PLUS_WORDS)) {
          if (!plus.find((s) => s.name === skill)) plus.push({ ...tag });
        } else if (!required.find((s) => s.name === skill) && !plus.find((s) => s.name === skill)) {
          // 默认归为必备（demo 行为）
          required.push(tag);
        }
      }
    });
  });

  // HR 核心考察点
  const hr = clauses.filter((c) => hasAny(c, HR_WORDS)).slice(0, 4);

  // 兜底：如果没提取到任何东西，给一些默认建议
  if (responsibilities.length === 0) {
    responsibilities.push("请参考 JD 描述补充核心职责");
  }
  if (required.length === 0 && plus.length === 0) {
    required.push({ name: "未识别到关键技能", hard: true });
  }
  if (hr.length === 0) {
    hr.push("沟通协作、主动学习、设计思维");
  }

  const allSkills = [
    ...required.map((s) => s.name),
    ...plus.map((s) => s.name),
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  return {
    role,
    responsibilities,
    required,
    plus,
    hr,
    allSkills,
  };
}

/**
 * 异步解析（带模拟延迟，UI 层调用此函数）
 */
export async function parseJd(text: string): Promise<JdParseResult> {
  // REAL_MODEL_INTEGRATION_POINT: replace with MiniMax/OpenAI call
  await sleep(600);
  return parseJdSync(text);
}
