# 设计师求职文书 AI 助手 · MVP Demo

> 基于 PRD v1.3 的 Next.js 工程化 Demo · 规则引擎实现 · 无真实 LLM 调用

## 🚀 快速开始

### 1. 安装依赖

```bash
cd job-assistant-web
npm install
```

> ⚠️ 如果遇到 npm 缓存权限问题，可指定临时缓存：
> ```bash
> npm install --cache=/tmp/npm-cache-job
> ```

### 2. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可体验。

### 3. 其他命令

```bash
npm run build        # 生产构建
npm run start        # 启动生产服务器
npm run lint         # ESLint
npm run typecheck    # TypeScript 类型检查
```

---

## 📋 PRD 验收标准对照

| # | PRD §12 验收项 | 验证步骤 | 通过判据 |
|---|---------------|---------|---------|
| ① | 粘贴 JD 后 30s 内看到 4 块解析 | 点「加载示例 JD」→「解析 JD」 | < 1.5s（mock 实际） |
| ② | F2 输出原句/问题/建议 + 润色版 + 作品集建议 | Step 2 完整跑通 | 6 条建议 + polished + 3 条作品集建议 |
| ③ | F3 输出 0-100 分 + 维度拆解 + 缺口 | Step 3「开始匹配打分」 | Ring 数字 + 3 条维度条 + 缺口非空 |
| ④ | 修改材料后重新打分 | 改 Step 2 resume → Step 3「重新打分」 | 数字与缺口实时变化 |
| ⑤ | 末尾导出按钮 | Step 4「复制润色稿」「下载报告」 | clipboard 成功 / .txt 文件下载 |
| ⑥ | 不虚构 + 隐私可见 | 顶部黄色 note + Footer「数据隐私」 | 顶部显示 + Dialog 可打开 |

---

## 🗂️ 项目结构

```
job-assistant-web/
├── app/
│   ├── layout.tsx              # 根布局 + <Toaster/>
│   ├── page.tsx                # 单页 Wizard 入口
│   └── globals.css             # Tailwind 基础样式
├── components/
│   ├── ui/                     # 基础 UI 组件（Button/Card/Textarea/Badge）
│   ├── layout/                 # SiteHeader / Stepper / SiteFooter
│   ├── shared/                 # LoadingDots / StatusTag
│   └── features/
│       ├── jd-parser/          # F1 · JD 解析
│       ├── doc-optimizer/      # F2 · 文书优化
│       ├── score/              # F3 · 匹配打分
│       └── export/             # F4 · 导出
├── lib/
│   ├── ai/                     # 规则引擎（Mock AI）
│   ├── sample-data/            # 示例 JD/简历/作品集
│   ├── format/                 # 报告生成 + 下载工具
│   └── utils.ts                # cn() + sleep()
├── store/
│   ├── use-wizard-store.ts     # Zustand 主 store
│   └── selectors.ts            # 派生 selector
├── types/
│   └── domain.ts               # 业务类型定义
├── tailwind.config.ts          # 主题扩展
└── package.json
```

---

## 🎨 主题色（demo 1:1 还原）

| 用途 | 颜色 | Tailwind 类 |
|------|------|------------|
| 品牌主色 | `#635bff` | `bg-brand` / `text-brand` |
| 品牌副色 | `#9b6bff` | `bg-brand-2` |
| 品牌浅底 | `#eef0ff` | `bg-brand-soft` |
| 硬门槛 | `#ef4444` | `bg-status-hard` / `bg-status-hardBg` |
| 软考察 | `#f59e0b` | `bg-status-soft` / `bg-status-softBg` |
| 命中 / 良好 | `#10b981` | `bg-status-ok` / `bg-status-okBg` |
| 页面背景 | `#f6f7fb` | `bg-surface-bg` |

---

## 🧠 Mock AI 引擎

5 个核心模块位于 `lib/ai/`：

| 模块 | 职责 |
|------|------|
| `dictionary.ts` | 7 个词表常量（SKILL_DICT / REQ_WORDS / PLUS_WORDS / RESP_WORDS / HR_WORDS / EXP_WORDS / SOFT_WORDS） |
| `text-utils.ts` | `splitClauses` / `findSkills` / `hasAny` |
| `parse-jd.ts` | F1 规则引擎（推断岗位方向 + 4 块抽取） |
| `optimize-doc.ts` | F2 规则引擎（生成 6 条建议 + 润色稿） |
| `score-match.ts` | F3 规则引擎（技能/经历/软素质 三维评分） |

每个引擎函数顶部都有 `// REAL_MODEL_INTEGRATION_POINT:` 注释，**直接替换为 MiniMax / OpenAI 调用即可接入真实 LLM**，UI 层无需改动。

---

## 🔄 端到端冒烟（按 PRD §12）

1. **Step 1**: 打开页面 → 点「加载示例 JD」→ 点「解析 JD」→ 应在 1.5s 内看到 4 块卡片。
2. **Step 2**: 自动跳到 Step 2 → 点「一键载入示例数据」→ 点「生成优化建议」→ 看到 6 条建议 + 润色稿 + 作品集建议。
3. **Step 3**: 自动跳到 Step 3 → 点「开始匹配打分」→ 看到 SVG 圆环 + 3 条维度条 + 缺口清单。
4. **Step 4**: 自动跳到 Step 4 → 点「复制润色稿」→ toast 成功 → 点「下载报告」→ 浏览器下载 .txt 文件。
5. **修改重打分**: 回到 Step 2 改简历 → 回到 Step 3 → 点「重新打分」→ 数字与缺口实时变化。
6. **重置**: 任一步骤点「解析新 JD」→ 确认 Dialog → 回到 Step 1。

---

## 📐 架构决策

- **单页向导**（`app/page.tsx`）：4 个步骤在同一路由内通过 Zustand 切换，与 PRD 状态机对齐（未解析JD → 已解析JD → 已上传材料 → 已润色 → 已打分）。
- **无多路由**：避免 URL 反向同步、状态丢失的复杂度。
- **客户端 Mock**：所有规则引擎在浏览器内运行，`'use client'` 边界最小化。
- **不接 persist**：刷新即清空，契合"隐私即焚"原则（PRD §8）。

---

## ⚠️ 已知限制

- 规则引擎匹配精度不如真实 LLM，适合演示与原型验证。
- 不支持 docx / pdf 上传（PRD 二期规划）。
- 不支持多会话管理与历史对比（二期）。
- 不支持真实投递平台打通（三期远景）。

---

## 📦 依赖说明

| 包 | 用途 |
|----|------|
| `next` 15.0 + `react` 19 RC | App Router + Turbopack |
| `zustand` 5.x | 状态管理 |
| `tailwindcss` 3.x | 样式（手动配置，避开 v4 语法差异） |
| `sonner` | Toast 通知 |
| `lucide-react` | 图标 |
| `class-variance-authority` | Button 变体 |
| `clsx` + `tailwind-merge` | 合并 className |
| `@radix-ui/*` | shadcn 基础组件（Dialog/Tabs/Progress 等备用） |

---

## 📝 后续路线

- **二期**: 接入真实 LLM API（`// REAL_MODEL_INTEGRATION_POINT` 替换点）
- **二期**: 文件上传解析（docx / pdf）、多会话管理
- **三期**: 招聘平台打通、个性化求职档案

---

## 📄 License

仅供学习与产品演示使用。
