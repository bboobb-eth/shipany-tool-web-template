import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx-utils";
import BlogDetail from "@/components/blocks/blog-detail";
import Empty from "@/components/blocks/empty";
import { notFound } from "next/navigation";

// 生成静态参数（SSG）
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug, locale }) => ({
    locale,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/posts/${slug}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/posts/${slug}`;
  }

  return {
    title: post.title,
    description: post.description || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // 转换为原有的 Post 格式
  const postData = {
    uuid: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    status: post.status,
    cover_url: post.cover_image,
    author_name: post.author,
    author_avatar_url: post.author_avatar,
    locale: post.locale,
  };

  return <BlogDetail post={postData} />;
}
