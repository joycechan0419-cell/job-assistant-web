# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是一个面向设计师求职者的单页 Next.js MVP，将 JD 解析、简历/作品集优化、匹配打分和报告导出串成四步向导。

当前所谓 “AI” 是纯客户端规则引擎：没有后端、数据库、API 路由或真实 LLM 调用。所有输入只保存在 Zustand 内存状态中，刷新或重置后清空。这是产品的“隐私即焚”约束，不要无意中引入持久化。

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 开发服务器：http://localhost:3000
npm run build        # 生产构建
npm run start        # 启动生产构建
npm run lint         # Next.js ESLint
npm run typecheck    # TypeScript strict 类型检查（tsc --noEmit）
```

项目目前没有配置单元测试、集成测试或 `test` 脚本，因此也没有“运行单个测试”的命令。修改后至少运行：

```bash
npm run lint && npm run typecheck && npm run build
```

手动端到端冒烟流程：加载示例 JD → 解析 JD → 加载示例简历/作品集 → 生成优化建议 → 匹配打分 → 复制润色稿/下载报告 → 重置。完整验收步骤见 `README.md`。

## 架构

### 四步单页向导

`app/page.tsx` 是唯一页面，通过 `currentStep` 条件渲染四个功能区，而不是使用多路由：

1. `components/features/jd-parser/`：输入并解析 JD
2. `components/features/doc-optimizer/`：优化简历和作品集
3. `components/features/score/`：计算匹配分和缺口
4. `components/features/export/`：复制润色稿、下载报告和重置

`components/layout/` 负责页面壳、步骤条和页脚，`components/ui/` 是手写的 shadcn 风格基础组件。

### 状态与流程控制

`store/use-wizard-store.ts` 是业务状态和动作的单一来源，包含：

- 三类输入：JD、简历、作品集
- 三类结果：`jdResult`、`optResult`、`scoreResult`
- 异步状态、步骤完成状态和历史分数
- 解析、优化、打分、导航、重置、复制和下载动作

成功执行解析、优化和打分后会依次自动进入下一步。`goTo()` 会检查前置结果，`store/selectors.ts` 提供步骤可进入性和进度派生值。新增流程状态时，应同步考虑主 store、selectors、Stepper 和页面条件渲染。

### 领域契约

`types/domain.ts` 定义 F1/F2/F3 之间的稳定数据契约：

- `JdParseResult`：岗位、职责、必备/加分技能、HR 考察点
- `OptResult`：命中/缺失关键词、逐条建议、作品集建议、润色稿
- `ScoreResult`：综合分、三维分数、权重和缺口

规则引擎、Zustand store 和展示组件都依赖这些类型。更改字段时必须沿整条数据流同步更新。

### Mock AI 规则引擎

`lib/ai/` 是核心业务逻辑，也是未来替换真实模型的边界：

- `dictionary.ts`：技能、职责、经历和软素质词表
- `text-utils.ts`：文本归一化、分句和关键词匹配
- `parse-jd.ts`：岗位推断与 JD 四类信息抽取
- `optimize-doc.ts`：改写建议、关键词差距和润色稿
- `score-match.ts`：技能/经历/软素质按 0.5/0.3/0.2 加权评分

每个模块都有同步纯函数供核心计算使用，以及带 `sleep()` 模拟延迟的异步函数供 UI/store 调用。`REAL_MODEL_INTEGRATION_POINT` 标记了真实模型接入位置；接入时尽量保持 `types/domain.ts` 的返回契约不变，避免 UI 层跟随重写。

### 示例与导出

- `lib/sample-data/` 提供贯穿完整流程的演示输入；其中刻意保留模糊表达，以展示优化前后的差异。
- `lib/format/report.ts` 生成纯文本报告。
- `lib/format/download.ts` 处理浏览器下载和剪贴板复制，因此仅能在客户端环境调用。

## 前端约定

- 使用 Next.js App Router、React 19 RC、TypeScript strict、Zustand 5 和 Tailwind CSS 3。
- 使用 `@/*` 绝对路径别名（映射到仓库根目录）。
- `app/page.tsx` 是客户端组件；规则计算目前也在浏览器中执行。
- 主题以 `tailwind.config.ts` 和 `app/globals.css` 为准：暗色 NES 像素风、直角边框、几乎无阴影。新增界面优先复用 `pixel.*`、`status.*` token 和现有 UI 组件，不要引入圆角视觉。
- `app/layout.tsx` 通过 `next/font/google` 加载 `Press_Start_2P`；首次无缓存构建可能需要网络。
- Tailwind 固定为 v3 配置方式，不要改用 v4 的 CSS-first 语法。
- 当前没有环境变量或运行时配置；`.env*.local` 已被忽略。

## 重要行为约束

- 保持纯客户端、无持久化的隐私模型，除非需求明确改变这一产品约束。
- 不要把 Mock 输出描述成真实 LLM 结果；页面和 README 都明确这是规则引擎 Demo。
- 修改评分规则时，注意 `SCORE_WEIGHTS`、结果展示和报告导出共同依赖相同维度。
- 修改示例数据或词表后，按 README 的四步流程验证解析结果、建议数量、分数变化、缺口和导出内容。
