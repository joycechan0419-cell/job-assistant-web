/**
 * 文本工具（demo 230-238 行移植）
 */
import { SKILL_DICT } from "./dictionary";

/** 标准化文本（小写、去两端空白） */
export function normalize(s: string): string {
  return (s || "").toLowerCase().trim();
}

/** 按中文标点和句号分句（demo 230 行） */
export function splitClauses(text: string): string[] {
  return text
    .split(/[。！？!?；;\n\r]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 找出文本中包含的技能词（demo 233 行） */
export function findSkills(text: string): string[] {
  const t = normalize(text);
  return SKILL_DICT.filter((w) => t.includes(w.toLowerCase()));
}

/** 文本是否包含任一关键词（demo 237 行） */
export function hasAny(text: string, words: string[]): boolean {
  const t = normalize(text);
  return words.some((w) => t.includes(w.toLowerCase()));
}

/** 转义 HTML 字符（用于复制到剪贴板、生成报告） */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** 截断文本到 N 字（中文字符也算 1） */
export function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n) + "…";
}
