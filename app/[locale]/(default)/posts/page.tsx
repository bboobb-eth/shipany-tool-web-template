import Blog from "@/components/blocks/blog";
import { Blog as BlogType } from "@/types/blocks/blog";
import { getPostsByLocale } from "@/lib/mdx-utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/posts`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/posts`;
  }

  return {
    title: t("blog.title"),
    description: t("blog.description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const posts = await getPostsByLocale(locale);

  // 转换为 BlogType 格式
  const blogItems = posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description || post.excerpt,
    author_name: post.author,
    author_avatar_url: post.author_avatar,
    created_at: post.created_at,
    locale: post.locale,
    cover_url: post.cover_image,
    content: post.content,
  }));

  const blog: BlogType = {
    title: t("blog.title"),
    description: t("blog.description"),
    items: blogItems,
    read_more_text: t("blog.read_more_text"),
  };

  return <Blog blog={blog} />;
}
