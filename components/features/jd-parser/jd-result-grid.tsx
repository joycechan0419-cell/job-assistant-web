"use client";

import { JdSectionCard } from "./jd-section-card";
import { SkillPill } from "./skill-pill";
import { StatusTag } from "@/components/shared/status-tag";
import type { JdParseResult } from "@/types/domain";

export interface JdResultGridProps {
  result: JdParseResult;
}

export function JdResultGrid({ result }: JdResultGridProps) {
  return (
    <div className="space-y-4">
      {/* 顶部概要 */}
      <div className="flex flex-wrap items-center gap-2 px-1 py-2 border-l-2 border-pixel-yellow bg-pixel-yellow/5">
        <span className="text-[10px] text-pixel-mute uppercase tracking-widest font-mono ml-3">
          ROLE:
        </span>
        <span className="text-sm font-bold uppercase tracking-wider text-pixel-yellow">
          {result.role}
        </span>
        <span className="text-[10px] text-pixel-mute ml-auto font-mono">
          共识别 {result.allSkills.length} 个关键技能
        </span>
      </div>

      {/* 4 块卡片 */}
      <JdSectionCard
        type="resp"
        title="核心职责"
        items={result.responsibilities.map((r, i) => (
          <span key={i} className="flex gap-2">
            <span className="text-pixel-yellow shrink-0">▸</span>
            <span>{r}</span>
          </span>
        ))}
      />

      <JdSectionCard
        type="req"
        title="必备技能"
        hint={`${result.required.length} 项 硬门槛`}
        items={result.required.map((s, i) => (
          <span key={i} className="flex items-center gap-2">
            <StatusTag tone="hard" />
            <SkillPill name={s.name} />
          </span>
        ))}
      />

      <JdSectionCard
        type="plus"
        title="加分项"
        hint={`${result.plus.length} 项 软考察`}
        items={
          result.plus.length === 0
            ? [
                <span key="empty" className="text-pixel-mute font-mono text-xs">
                  未识别到加分项
                </span>,
              ]
            : result.plus.map((s, i) => (
                <span key={i} className="flex items-center gap-2">
                  <StatusTag tone="soft" />
                  <SkillPill name={s.name} />
                </span>
              ))
        }
      />

      <JdSectionCard
        type="hr"
        title="HR 核心考察点"
        items={result.hr.map((h, i) => (
          <span key={i} className="flex gap-2">
            <span className="text-pixel-blue shrink-0">▸</span>
            <span>{h}</span>
          </span>
        ))}
      />
    </div>
  );
}
