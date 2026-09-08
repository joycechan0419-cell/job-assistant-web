/**
 * 派生选择器
 */
import { useWizardStore } from "./use-wizard-store";
import type { Step } from "@/types/domain";

export const useCanEnter = (n: Step): boolean => {
  const { jdResult, optResult, scoreResult } = useWizardStore();
  if (n === 1) return true;
  if (n === 2) return !!jdResult;
  if (n === 3) return !!optResult;
  if (n === 4) return !!scoreResult;
  return false;
};

export const useProgress = () => {
  const completed = useWizardStore((s) => s.completed);
  const total = 4;
  const doneCount = Object.values(completed).filter(Boolean).length;
  return { total, done: doneCount, percent: Math.round((doneCount / total) * 100) };
};
