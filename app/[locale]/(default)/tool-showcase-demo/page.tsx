import ToolShowcase from "@/components/blocks/tool-showcase";
import { ToolShowcase as ToolShowcaseType } from "@/types/blocks/tool-showcase";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return {
    title: "Tool Showcase Demo",
    description: "Demonstration of the tool showcase component",
    robots: "noindex, nofollow", // 防止搜索引擎索引演示页面
  };
}

export default async function ToolShowcaseDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  // 示例数据
  const toolShowcaseData: ToolShowcaseType = {
    title: locale === 'zh' ? "AI 工具功能展示" : "AI Tool Features",
    description: locale === 'zh' 
      ? "探索我们强大的 AI 工具集，每个工具都经过精心设计，为您提供最佳的用户体验。"
      : "Explore our powerful AI tool suite, each carefully designed to provide you with the best user experience.",
    label: locale === 'zh' ? "功能展示" : "Features",
    items: [
      {
        title: locale === 'zh' ? "AI 文本生成器" : "AI Text Generator",
        description: locale === 'zh' 
          ? "使用最先进的 AI 模型生成高质量的文本内容。支持多种写作风格和语言，帮助您快速创建博客文章、营销文案、产品描述等各类内容。"
          : "Generate high-quality text content using state-of-the-art AI models. Support multiple writing styles and languages to help you quickly create blog posts, marketing copy, product descriptions, and more.",
        badge: locale === 'zh' ? "热门工具" : "Popular",
        features: [
          {
            icon: "zap",
            title: locale === 'zh' ? "快速生成" : "Fast Generation",
            description: locale === 'zh' ? "几秒钟内生成高质量内容" : "Generate high-quality content in seconds"
          },
          {
            icon: "globe",
            title: locale === 'zh' ? "多语言支持" : "Multi-language Support", 
            description: locale === 'zh' ? "支持50+种语言的内容生成" : "Support content generation in 50+ languages"
          },
          {
            icon: "settings",
            title: locale === 'zh' ? "自定义风格" : "Custom Styles",
            description: locale === 'zh' ? "根据需求调整写作风格和语调" : "Adjust writing style and tone according to your needs"
          }
        ],
        video: {
          src: "/videos/ai-text-generator-demo.mp4",
          poster: "/images/video-posters/text-generator.jpg",
          autoplay: false,
          loop: true,
          muted: true,
          controls: false
        },
        buttons: [
          {
            text: locale === 'zh' ? "立即体验" : "Try Now",
            url: "/tools/text-generator",
            variant: "default",
            icon: "play"
          },
          {
            text: locale === 'zh' ? "查看文档" : "View Docs",
            url: "/docs/text-generator",
            variant: "outline",
            icon: "book"
          }
        ]
      },
      {
        title: locale === 'zh' ? "AI 图像生成器" : "AI Image Generator",
        description: locale === 'zh'
          ? "通过文本描述生成精美的图像。我们的 AI 图像生成器能够理解复杂的描述，创造出符合您需求的高质量图像，适用于设计、营销、内容创作等多个场景。"
          : "Generate stunning images from text descriptions. Our AI image generator can understand complex descriptions and create high-quality images that meet your needs, suitable for design, marketing, content creation, and more.",
        badge: locale === 'zh' ? "新功能" : "New",
        reverse: true, // 反转布局
        features: [
          {
            icon: "image",
            title: locale === 'zh' ? "高清输出" : "HD Output",
            description: locale === 'zh' ? "生成高分辨率的专业级图像" : "Generate high-resolution professional-grade images"
          },
          {
            icon: "palette",
            title: locale === 'zh' ? "多种风格" : "Multiple Styles",
            description: locale === 'zh' ? "支持写实、卡通、艺术等多种风格" : "Support realistic, cartoon, artistic and other styles"
          },
          {
            icon: "download",
            title: locale === 'zh' ? "批量下载" : "Batch Download",
            description: locale === 'zh' ? "一键下载多张生成的图像" : "Download multiple generated images with one click"
          }
        ],
        video: {
          src: "/videos/ai-image-generator-demo.mp4",
          poster: "/images/video-posters/image-generator.jpg",
          autoplay: false,
          loop: true,
          muted: true,
          controls: false
        },
        buttons: [
          {
            text: locale === 'zh' ? "开始创作" : "Start Creating",
            url: "/tools/image-generator",
            variant: "default",
            icon: "image"
          }
        ]
      },
      {
        title: locale === 'zh' ? "AI 代码助手" : "AI Code Assistant",
        description: locale === 'zh'
          ? "智能代码生成和优化工具。支持多种编程语言，能够根据您的需求生成代码片段、解释代码逻辑、优化代码性能，是开发者的得力助手。"
          : "Intelligent code generation and optimization tool. Support multiple programming languages, generate code snippets according to your needs, explain code logic, optimize code performance, and be a powerful assistant for developers.",
        features: [
          {
            icon: "code",
            title: locale === 'zh' ? "智能补全" : "Smart Completion",
            description: locale === 'zh' ? "基于上下文的智能代码补全" : "Context-based intelligent code completion"
          },
          {
            icon: "bug",
            title: locale === 'zh' ? "错误检测" : "Bug Detection",
            description: locale === 'zh' ? "自动检测并修复代码中的错误" : "Automatically detect and fix errors in code"
          },
          {
            icon: "optimize",
            title: locale === 'zh' ? "性能优化" : "Performance Optimization",
            description: locale === 'zh' ? "分析并优化代码性能" : "Analyze and optimize code performance"
          }
        ],
        image: {
          src: "/images/code-assistant-demo.jpg",
          alt: locale === 'zh' ? "AI 代码助手界面" : "AI Code Assistant Interface"
        },
        buttons: [
          {
            text: locale === 'zh' ? "体验编码" : "Try Coding",
            url: "/tools/code-assistant",
            variant: "default",
            icon: "code"
          },
          {
            text: locale === 'zh' ? "API 文档" : "API Docs",
            url: "/docs/api",
            variant: "outline",
            icon: "api"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <ToolShowcase toolShowcase={toolShowcaseData} />
    </div>
  );
}
