/**
 * 主向导状态（Zustand）
 * 文档：types/domain.ts
 */
import { create } from "zustand";
import { toast } from "sonner";
import { parseJd, parseJdSync } from "@/lib/ai/parse-jd";
import { optimizeDoc, reoptimize } from "@/lib/ai/optimize-doc";
import { scoreMatch, rescore } from "@/lib/ai/score-match";
import { generateReport } from "@/lib/format/report";
import { downloadText, copyToClipboard } from "@/lib/format/download";
import { SAMPLE_JD, SAMPLE_RESUME, SAMPLE_PORTFOLIO } from "@/lib/sample-data";
import type {
  Step,
  JdParseResult,
  OptResult,
  ScoreResult,
  WizardStatus,
} from "@/types/domain";

type WizardState = {
  currentStep: Step;
  jdText: string;
  resumeText: string;
  portfolioText: string;
  jdResult: JdParseResult | null;
  optResult: OptResult | null;
  scoreResult: ScoreResult | null;
  status: WizardStatus;
  completed: Record<Step, boolean>;
  scoreHistory: number[]; // 历次打分（用于对比）
};

type WizardActions = {
  setJdText: (s: string) => void;
  setResumeText: (s: string) => void;
  setPortfolioText: (s: string) => void;

  loadSampleJD: () => void;
  loadSampleDocs: () => void;

  parseJdAction: () => Promise<void>;
  optimize: () => Promise<void>;
  score: () => Promise<void>;
  rescoreAction: () => Promise<void>;

  goTo: (n: Step) => void;
  reset: () => void;

  copyPolished: () => Promise<void>;
  downloadReport: () => void;
};

const initialStatus: WizardStatus = {
  parse: "idle",
  optimize: "idle",
  score: "idle",
};

const initialCompleted: Record<Step, boolean> = {
  1: false,
  2: false,
  3: false,
  4: false,
};

export const useWizardStore = create<WizardState & WizardActions>(
  (set, get) => ({
    currentStep: 1,
    jdText: "",
    resumeText: "",
    portfolioText: "",
    jdResult: null,
    optResult: null,
    scoreResult: null,
    status: { ...initialStatus },
    completed: { ...initialCompleted },
    scoreHistory: [],

    // 输入
    setJdText: (s) => set({ jdText: s }),
    setResumeText: (s) => set({ resumeText: s }),
    setPortfolioText: (s) => set({ portfolioText: s }),

    // 示例数据
    loadSampleJD: () => {
      set({ jdText: SAMPLE_JD });
      toast.success("已载入示例 JD");
    },
    loadSampleDocs: () => {
      set({ resumeText: SAMPLE_RESUME, portfolioText: SAMPLE_PORTFOLIO });
      toast.success("已载入示例简历与作品集");
    },

    // F1 解析
    parseJdAction: async () => {
      const { jdText } = get();
      if (jdText.trim().length < 20) {
        toast.error("JD 内容太短（至少 20 字）");
        return;
      }
      set({ status: { ...get().status, parse: "loading" } });
      try {
        const result = await parseJd(jdText);
        set({
          jdResult: result,
          status: { ...get().status, parse: "done" },
          completed: { ...get().completed, 1: true },
          currentStep: 2,
        });
        toast.success(`✓ 已解析为「${result.role}」`);
      } catch (e) {
        set({ status: { ...get().status, parse: "error" } });
        toast.error("解析失败，请重试");
      }
    },

    // F2 优化
    optimize: async () => {
      const { jdText, jdResult, resumeText, portfolioText } = get();
      if (!jdResult) {
        toast.error("请先完成 F1 · JD 解析");
        return;
      }
      if (resumeText.trim().length < 10) {
        toast.error("请先填写简历或作品集内容");
        return;
      }
      set({ status: { ...get().status, optimize: "loading" } });
      try {
        const result = await optimizeDoc(resumeText, portfolioText, jdText);
        set({
          optResult: result,
          status: { ...get().status, optimize: "done" },
          completed: { ...get().completed, 2: true },
          currentStep: 3,
        });
        toast.success(`✓ 已生成 ${result.suggestions.length} 条改写建议`);
      } catch (e) {
        set({ status: { ...get().status, optimize: "error" } });
        toast.error("优化失败，请重试");
      }
    },

    // F3 打分
    score: async () => {
      const { jdText, jdResult, resumeText, portfolioText } = get();
      if (!jdResult) {
        toast.error("请先完成 F1 · JD 解析");
        return;
      }
      if (resumeText.trim().length < 10) {
        toast.error("请先填写简历内容");
        return;
      }
      set({ status: { ...get().status, score: "loading" } });
      try {
        const result = await scoreMatch(resumeText, portfolioText, jdText);
        set((state) => ({
          scoreResult: result,
          status: { ...state.status, score: "done" },
          completed: { ...state.completed, 3: true },
          currentStep: 4,
          scoreHistory: [...state.scoreHistory, result.total],
        }));
        toast.success(`✓ 综合匹配分：${result.total}`);
      } catch (e) {
        set({ status: { ...get().status, score: "error" } });
        toast.error("打分失败，请重试");
      }
    },

    // 重新打分（不依赖 optResult）
    rescoreAction: async () => {
      const { jdResult, resumeText, portfolioText } = get();
      if (!jdResult) {
        toast.error("请先完成 F1 · JD 解析");
        return;
      }
      set({ status: { ...get().status, score: "loading" } });
      try {
        const result = await rescore(resumeText, portfolioText, jdResult);
        set((state) => ({
          scoreResult: result,
          status: { ...state.status, score: "done" },
          scoreHistory: [...state.scoreHistory, result.total],
        }));
        toast.success(`✓ 重新打分：${result.total}`);
      } catch (e) {
        set({ status: { ...get().status, score: "error" } });
        toast.error("重新打分失败");
      }
    },

    // 导航
    goTo: (n) => {
      const { jdResult, optResult, scoreResult, completed } = get();
      if (n === 2 && !jdResult) {
        toast.error("请先完成 F1 · JD 解析");
        return;
      }
      if (n === 3 && !optResult) {
        toast.error("请先完成 F2 · 文书优化");
        return;
      }
      if (n === 4 && !scoreResult) {
        toast.error("请先完成 F3 · 匹配打分");
        return;
      }
      set({ currentStep: n });
    },

    // 重置
    reset: () => {
      set({
        currentStep: 1,
        jdText: "",
        resumeText: "",
        portfolioText: "",
        jdResult: null,
        optResult: null,
        scoreResult: null,
        status: { ...initialStatus },
        completed: { ...initialCompleted },
        scoreHistory: [],
      });
      toast.success("已重置所有数据");
    },

    // 导出
    copyPolished: async () => {
      const { optResult } = get();
      if (!optResult) {
        toast.error("请先生成润色稿");
        return;
      }
      const ok = await copyToClipboard(optResult.polished);
      if (ok) {
        toast.success("✓ 已复制润色稿到剪贴板");
      } else {
        toast.error("复制失败，请手动复制");
      }
    },

    downloadReport: () => {
      const { jdResult, optResult, scoreResult, jdText } = get();
      if (!jdResult || !optResult || !scoreResult) {
        toast.error("请先完成所有 3 个步骤");
        return;
      }
      const report = generateReport(jdResult, optResult, scoreResult, jdText);
      downloadText("求职文书匹配报告.txt", report);
      toast.success("✓ 报告已下载");
    },
  })
);
