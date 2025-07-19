"use client";

import Markdown from "@/components/markdown";
import { Post } from "@/types/post";
import moment from "moment";
import BackButton from "@/components/back-button";
import { SVGAvatar } from "@/components/avatar-generator";
import { useTranslations } from "next-intl";
import { umamiEvents } from "@/components/analytics/umami";
import { useEffect } from "react";

export default function BlogDetail({ post }: { post: Post }) {
  const t = useTranslations('blog');

  // 构建返回URL
  const backUrl = post.locale === 'en' ? '/en/posts' : `/${post.locale}/posts`;

  // 追踪博客阅读事件
  useEffect(() => {
    if (post.slug && post.locale) {
      umamiEvents.readBlogPost(post.slug, post.locale);
    }
  }, [post.slug, post.locale]);

  return (
    <section className="py-8 md:py-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* 返回按钮 */}
        <div className="mb-8">
          <BackButton fallbackUrl={backUrl}>
            {t('back_to_list')}
          </BackButton>
        </div>

        {/* 文章标题 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl mb-8 leading-tight">
            {post.title}
          </h1>

          {/* 作者信息 */}
          <div className="flex items-center justify-center gap-4 text-sm md:text-base">
            {/* 使用随机生成的SVG头像 */}
            <SVGAvatar
              name={post.author_name || 'Anonymous'}
              size={48}
              className="border-2 border-border"
            />
            <div className="text-left">
              <div className="font-semibold text-foreground">
                {post.author_name || t('anonymous')}
              </div>
              <div className="text-muted-foreground">
                {post.created_at
                  ? moment(post.created_at).format('MMMM DD, YYYY')
                  : t('recently_published')
                }
              </div>
            </div>
          </div>
        </div>

        {/* 封面图片 */}
        {post.cover_url && (
          <div className="mb-12">
            <img
              src={post.cover_url}
              alt={post.title || ''}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* 文章内容 */}
        <div className="prose prose-lg prose-gray max-w-none dark:prose-invert">
          {post.content && <Markdown content={post.content} />}
        </div>

        {/* 底部返回按钮 */}
        <div className="mt-12 pt-8 border-t border-border">
          <BackButton fallbackUrl={backUrl} className="mx-auto">
            {t('back_to_list')}
          </BackButton>
        </div>
      </div>
    </section>
  );
}
