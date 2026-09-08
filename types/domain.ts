/**
 * 业务领域类型定义
 * Source: PRD §5 + demo/index.html
 */

export type Step = 1 | 2 | 3 | 4;

/** 带硬软标签的技能条目 */
export type SkillTag = {
  name: string;
  hard: boolean; // true = 硬门槛必备技能；false = 软考察加分项
};

/** F1 · JD 解析结果 */
export type JdParseResult = {
  role: string; // 推断的岗位方向
  responsibilities: string[]; // 核心职责
  required: SkillTag[]; // 必备技能（硬门槛）
  plus: SkillTag[]; // 加分项（软考察）
  hr: string[]; // HR 核心考察点
  allSkills: string[]; // required + plus 合并（去重）— 给 F2/F3 用
};

/** F2 · 单条改写建议 */
export type Suggestion = {
  orig: string; // 原句
  problem: string; // 问题诊断
  fix: string; // 建议改写
};

/** F2 · 文书优化结果 */
export type OptResult = {
  matched: string[]; // 命中的关键词
  missing: string[]; // 待补强的关键词
  suggestions: Suggestion[]; // 逐条改写建议
  portfolioTips: string[]; // 作品集结构/取舍建议
  polished: string; // 可直接复用的润色稿
};

/** F3 · 缺口项 */
export type Gap = {
  name: string;
  imp: "hi" | "mid"; // 高优 / 中优
};

/** F3 · 匹配打分结果 */
export type ScoreResult = {
  total: number; // 0-100 综合
  skillScore: number; // 技能匹配分
  expScore: number; // 经历匹配分
  softScore: number; // 软素质匹配分
  weights: { skill: number; exp: number; soft: number };
  gaps: Gap[];
  matchedCount: number; // 命中关键词数
  reqTotal: number; // JD 必备技能数
  scoreHistory?: number[]; // 历次打分（用于对比）
};

/** 异步状态机 */
export type AsyncStatus = "idle" | "loading" | "done" | "error";

export type WizardStatus = {
  parse: AsyncStatus;
  optimize: AsyncStatus;
  score: AsyncStatus;
};
