"use client";

import Markdown from "@/components/markdown";

interface MDXContentProps {
  content: string;
}

/**
 * MDX 内容渲染器
 * 使用现有的 Markdown 组件来渲染 MDX 内容
 * 在 MDX 内容中，JSX 语法已经在 lib/mdx-utils.ts 中被处理掉了
 */
export default function MDXContent({ content }: MDXContentProps) {
  return <Markdown content={content} />;
}
