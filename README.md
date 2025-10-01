# HumToSong Web MVP

HumToSong 提供哼唱识曲与曲目信息服务。本仓库是 Web 端最小可行产品（MVP），基于 Next.js + Supabase + Tailwind 搭建，已精简所有与识曲无关的模板功能，便于继续二次开发。

![preview](preview.png)

## 开发指南

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **启动开发环境**

   ```bash
   pnpm dev
   ```

3. **环境变量**

   复制示例文件并补充 ACRCloud 及其他必要配置：

   ```bash
   cp .env.example .env.local
   ```

   - `ACR_ACCESS_KEY` / `ACR_ACCESS_SECRET`
   - `ACR_HOST`
   - `ACR_META_TOKEN`
   - `NEXT_PUBLIC_UMAMI_*`（可选监控）

4. **文案与多语言**

   - 登陆页内容：`i18n/pages/landing`
   - 案例展示：`i18n/pages/showcase`
   - 通用文案：`i18n/messages`

5. **样式与主题**

   Tailwind 配置位于 `tailwind.config.ts`，可按需更新主题色与组件样式。

## 常用脚本

```bash
pnpm lint       # ESLint 检查
pnpm typecheck  # TypeScript 类型检查
pnpm build      # 生成生产构建
```

## 部署

- 推荐：Vercel（默认配置对齐 Next.js）
- 其他：Cloudflare / 自托管（如不需要可忽略 `wrangler.toml.example`、`Dockerfile`）

部署前请确认：

- `.env.production` 仅包含必要变量；
- `pnpm build`、`pnpm lint`、`pnpm typecheck` 通过；
- 去除或替换所有示例资源（`public/humtosong` 等）。

## 目录概览

- `app/`：Next.js 应用路由与页面
- `services/`：API 调用与业务逻辑
- `components/`：复用的 UI 组件
- `i18n/`：多语言内容与配置
- `public/`：静态资源（HumToSong 品牌素材）

## 反馈与支持

- 产品或商务合作：`hello@humtosong.com`
- Bug / 需求：提 Issue 或合并请求

## License

- [HumToSong MVP License](LICENSE)
