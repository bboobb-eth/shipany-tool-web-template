import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  description?: string;
  author?: string;
  author_avatar?: string;
  cover_image?: string;
  status?: 'online' | 'offline' | 'draft';
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  content: string;
  excerpt?: string;
}

export interface BlogFrontMatter {
  title: string;
  description?: string;
  author?: string;
  author_avatar?: string;
  cover_image?: string;
  slug?: string;
  status?: 'online' | 'offline' | 'draft';
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

/**
 * 解析 MDX 文件的 frontmatter 和内容
 */
function parseMDXContent(fileContent: string): {
  frontMatter: BlogFrontMatter;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontMatter: {} as BlogFrontMatter,
      content: fileContent,
    };
  }
  
  const yamlContent = match[1];
  const content = match[2];
  
  // 简单的 YAML 解析
  const frontMatter: any = {};
  const lines = yamlContent.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // 移除引号
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // 处理数组
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        frontMatter[key] = arrayContent.split(',').map(item => 
          item.trim().replace(/^["']|["']$/g, '')
        ).filter(item => item.length > 0);
      } else {
        frontMatter[key] = value;
      }
    }
  }
  
  return { frontMatter, content };
}

/**
 * 生成文章摘要
 */
function generateExcerpt(content: string, maxLength: number = 200): string {
  let excerpt = content
    .replace(/#{1,6}\s+/g, '') // 移除标题标记
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
    .replace(/`(.*?)`/g, '$1') // 移除行内代码标记
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除链接，保留文本
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/\n+/g, ' ') // 将换行符替换为空格
    .trim();

  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength) + '...';
  }

  return excerpt;
}

/**
 * 生成 slug
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * 扫描所有 MDX 文件
 */
async function scanMDXFiles(): Promise<string[]> {
  const files: string[] = [];
  
  async function scanDir(dir: string) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDir(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // 目录不存在时忽略错误
    }
  }
  
  await scanDir(CONTENT_DIR);
  return files;
}

/**
 * 获取所有博客文章（缓存）
 */
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const files = await scanMDXFiles();
  const posts: BlogPost[] = [];
  
  for (const filePath of files) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { frontMatter, content } = parseMDXContent(fileContent);
      
      // 跳过草稿状态的文章
      if (frontMatter.status === 'draft' || frontMatter.status === 'offline') {
        continue;
      }
      
      // 从文件路径推断语言和 slug
      const relativePath = path.relative(CONTENT_DIR, filePath);
      const pathParts = relativePath.split(path.sep);
      const locale = pathParts[0] || 'en';
      const fileName = path.basename(filePath, '.mdx');
      
      const slug = frontMatter.slug || generateSlug(frontMatter.title || fileName);
      
      posts.push({
        slug,
        locale,
        title: frontMatter.title || fileName,
        description: frontMatter.description,
        author: frontMatter.author,
        author_avatar: frontMatter.author_avatar,
        cover_image: frontMatter.cover_image,
        status: frontMatter.status || 'online',
        tags: frontMatter.tags,
        created_at: frontMatter.created_at,
        updated_at: frontMatter.updated_at,
        content,
        excerpt: generateExcerpt(content),
      });
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }
  
  // 按创建时间排序
  return posts.sort((a, b) => {
    const dateA = new Date(a.created_at || '1970-01-01');
    const dateB = new Date(b.created_at || '1970-01-01');
    return dateB.getTime() - dateA.getTime();
  });
});

/**
 * 根据语言获取博客文章
 */
export const getPostsByLocale = cache(async (locale: string): Promise<BlogPost[]> => {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.locale === locale);
});

/**
 * 根据 slug 和语言获取单篇文章
 */
export const getPostBySlug = cache(async (slug: string, locale: string): Promise<BlogPost | null> => {
  const allPosts = await getAllPosts();
  return allPosts.find(post => post.slug === slug && post.locale === locale) || null;
});

/**
 * 获取所有可用的 slug 和语言组合（用于 generateStaticParams）
 */
export const getAllPostSlugs = cache(async (): Promise<Array<{ slug: string; locale: string }>> => {
  const allPosts = await getAllPosts();
  return allPosts.map(post => ({
    slug: post.slug,
    locale: post.locale,
  }));
});
