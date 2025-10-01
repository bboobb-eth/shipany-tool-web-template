# HumToSong Web

HumToSong 的 Web 端以 Next.js 15 构建，并使用 OpenNext + Cloudflare Workers 部署到边缘。项目已收敛为 MVP 所需的最小栈：Next.js App Router、Supabase、Tailwind、Umami，并移除了所有与识曲无关的模板内容。

![preview](preview.png)

## 技术栈

- **前端框架**：Next.js 15 (App Router, React 19)
- **状态 / 数据**：Supabase、NextAuth、next-intl
- **样式系统**：Tailwind CSS、shadcn/ui 组件
- **部署目标**：OpenNext 3 + Cloudflare Workers
- **监控选项**：Umami 或 GA4（二选一）

## 快速开始

```bash
pnpm install              # 安装依赖
cp .env.example .env.local # 填写 ACR/Supabase/Analytics 等变量
pnpm dev                  # 开发模式
```

常用开发脚本：

```bash
pnpm lint       # ESLint
pnpm typecheck  # TypeScript 检查
pnpm build      # Next.js 本地生产构建
pnpm build:cf   # OpenNext 打包 Cloudflare 产物
pnpm preview:cf # （可选）wrangler 本地模拟
pnpm deploy:cf  # 部署到 Cloudflare Workers
```

## 目录速览

- `app/`：App Router 页面与 API
- `components/`：UI 组件（含 blocks、dashboard 等模块）
- `i18n/`：多语言资源（landing/showcase 等文案）
- `services/`：业务逻辑与 Supabase 访问层
- `types/`：共享类型定义
- `open-next.config.mjs` / `wrangler.toml`：Cloudflare 构建与部署配置

## 环境变量说明

在 `.env.local` 或 Cloudflare Secrets 中设置：

- **ACRCloud**：`ACR_ACCESS_KEY`、`ACR_ACCESS_SECRET`、`ACR_HOST`、`ACR_META_TOKEN`
- **Supabase**：`SUPABASE_URL`、`SUPABASE_ANON_KEY`、`SALTED_HASH_SECRET`
- **Analytics (可选)**：`NEXT_PUBLIC_UMAMI_SCRIPT_URL`、`NEXT_PUBLIC_UMAMI_WEBSITE_ID` 或 `NEXT_PUBLIC_GA_ID`

## 部署流程（Cloudflare）

1. 确认命令通过：`pnpm lint && pnpm typecheck && pnpm build:cf`
2. Cloudflare Dashboard → 添加环境变量（同 `.env.example`）
3. 本地或 CI 执行：`pnpm deploy:cf`
4. 访问 Cloudflare Pages/Workers 预览与生产环境验证

## 后续开发方向

- `/app/api/hum/route.ts`：接入 ACRCloud 识别逻辑
- `useHumRecorder`：实现前端录音与上传流程
- Supabase `hum_logs`：记录识别请求与状态
- 结果卡片 UI：呈现识别结果、历史记录

## 许可证

[HumToSong MVP License](LICENSE)
