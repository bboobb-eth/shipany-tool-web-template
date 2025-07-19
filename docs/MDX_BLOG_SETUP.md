# MDX 静态博客系统设置指南

## 🎯 功能概述

这个系统允许您在本地编写 MDX 文件，在编译时自动生成静态博客页面。使用 Next.js SSG (Static Site Generation) 技术，无需数据库，性能卓越。

## ✨ 特性

- 📝 **本地编写**：在 `content/blog/` 目录下编写 MDX 文件
- 🔄 **静态生成**：编译时自动生成静态 HTML 页面
- ⚡ **极致性能**：静态页面，CDN 友好，加载速度极快
- 🌍 **多语言支持**：通过目录结构自动识别语言
- 🏷️ **Frontmatter 支持**：丰富的元数据配置
- 🚀 **零数据库**：纯文件系统，部署简单

## 🚀 快速开始

### 1. 安装依赖

```bash
# 运行安装脚本
./scripts/install-deps.sh

# 或手动安装
pnpm add tsx
```

### 2. 测试现有示例

```bash
# 测试 MDX 解析功能
pnpm test:content

# 处理内容文件
pnpm build:content
```

### 3. 创建 MDX 文件

在 `content/blog/` 目录下创建您的 MDX 文件：

```
content/blog/
├── en/
│   └── my-first-post.mdx
└── zh/
    └── wo-de-di-yi-pian-wen-zhang.mdx
```

### 4. MDX 文件格式

```mdx
---
title: "我的第一篇文章"
description: "这是一篇示例文章"
author: "作者名"
author_avatar: "/avatars/author.jpg"
cover_image: "/blog/cover.jpg"
slug: "my-first-post"
status: "online"
tags: ["教程", "示例"]
created_at: "2024-01-15T10:00:00Z"
---

# 文章标题

这里是文章内容...

## 子标题

更多内容...
```

### 5. 构建和部署

```bash
# 测试内容解析
pnpm test:content

# 只处理内容文件
pnpm build:content

# 构建整个应用（包含内容处理）
pnpm build

# 开发模式
pnpm dev
```

## 📁 目录结构

```
project/
├── content/
│   ├── blog/
│   │   ├── en/              # 英文文章
│   │   └── zh/              # 中文文章
│   ├── .content-cache.json  # 缓存文件（自动生成）
│   └── README.md
├── scripts/
│   ├── build-content.ts     # 内容构建脚本
│   └── install-deps.sh      # 依赖安装脚本
├── lib/
│   ├── mdx-parser.ts        # MDX 解析器
│   └── build-hooks.ts       # 构建钩子
└── docs/
    └── MDX_BLOG_SETUP.md    # 本文档
```

## ⚙️ 工作原理

### 构建流程

1. **文件扫描** - 扫描 `content/blog/` 下的所有 `.mdx` 文件
2. **变更检测** - 通过文件哈希检测变更，只处理修改过的文件
3. **内容解析** - 提取 frontmatter 和正文内容
4. **数据验证** - 验证必填字段和格式
5. **数据库操作** - 创建或更新数据库记录
6. **缓存更新** - 更新文件处理缓存

### 增量更新机制

- 使用 MD5 哈希检测文件变更
- 缓存文件记录处理状态
- 只处理有变动的文件，提高构建效率

## 📝 Frontmatter 字段说明

### 必填字段
- `title`: 文章标题

### 可选字段
- `description`: 文章描述（SEO）
- `author`: 作者名称
- `author_avatar`: 作者头像路径
- `cover_image`: 封面图片路径
- `slug`: URL 友好的标识符（自动生成）
- `status`: 文章状态（`online`, `offline`, `created`）
- `tags`: 标签数组
- `created_at`: 创建时间（ISO 格式）
- `updated_at`: 更新时间（自动生成）

### 语言支持
- 语言通过目录结构自动识别
- `content/blog/en/` → 英文文章
- `content/blog/zh/` → 中文文章
- 可添加更多语言目录

## 🔧 高级配置

### 自定义构建脚本

您可以修改 `scripts/build-content.ts` 来自定义处理逻辑：

```typescript
// 自定义内容处理
function processMarkdownContent(content: string): string {
  // 添加您的自定义处理逻辑
  return content;
}

// 自定义验证规则
function validateFrontMatter(frontMatter: MDXFrontMatter): string[] {
  // 添加您的验证规则
  return [];
}
```

### 集成到 CI/CD

在您的 CI/CD 流程中添加内容构建步骤：

```yaml
# GitHub Actions 示例
- name: Build Content
  run: pnpm build:content

- name: Build Application
  run: pnpm build
```

## 🐛 故障排除

### 常见问题

1. **构建失败**
   - 检查 frontmatter 格式是否正确
   - 确保必填字段已填写
   - 查看控制台错误信息

2. **文章未显示**
   - 检查 `status` 字段是否为 `online`
   - 确认 slug 在同语言下唯一
   - 验证数据库连接配置

3. **缓存问题**
   - 删除 `.content-cache.json` 强制重新处理
   - 检查文件权限

### 调试命令

```bash
# 查看详细构建日志
DEBUG=1 pnpm build:content

# 强制重新处理所有文件
rm content/.content-cache.json && pnpm build:content

# 检查数据库中的文章
# 在 Supabase 控制台中运行：
SELECT title, slug, locale, status FROM posts ORDER BY created_at DESC;
```

## 📚 示例文件

项目已包含示例文件：
- `content/blog/en/getting-started.mdx` - 英文示例
- `content/blog/zh/kuai-su-kai-shi.mdx` - 中文示例

您可以参考这些文件的格式来创建自己的内容。

## 🎉 完成！

现在您可以：
1. 在 `content/blog/` 下创建 MDX 文件
2. 运行 `pnpm build` 自动处理内容
3. 在网站上查看您的博客文章

享受使用 ShipAny 的 MDX 博客系统！
