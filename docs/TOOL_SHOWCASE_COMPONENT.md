# 🛠️ Tool Showcase 组件使用指南

## 🎯 组件概述

Tool Showcase 组件是一个专为展示工具网站功能而设计的高级组件。它采用左右分栏布局，左侧展示功能描述（有利于 SEO 优化），右侧展示功能演示视频或图片。

## ✨ 主要特性

- 🎨 **响应式设计**: 完美适配桌面端和移动端
- 🎬 **视频播放器**: 内置自定义视频播放控件
- 🔄 **布局反转**: 支持左右布局反转
- 🌍 **国际化支持**: 完整的多语言支持
- 🎯 **SEO 优化**: 结构化的内容布局，有利于搜索引擎优化
- 📱 **交互友好**: 悬停效果和平滑动画

## 🏗️ 组件结构

### 类型定义

```typescript
interface ToolShowcase {
  disabled?: boolean;
  name?: string;
  title?: string;
  description?: string;
  label?: string;
  items?: ToolShowcaseItem[];
}

interface ToolShowcaseItem {
  title: string;
  description: string;
  features?: ToolFeature[];
  video?: ToolVideo;
  image?: Image;
  buttons?: Button[];
  badge?: string;
  reverse?: boolean; // 布局反转
}
```

### 核心功能

1. **视频播放器**
   - 自定义播放控件
   - 支持播放/暂停
   - 音量控制
   - 悬停显示控件

2. **功能特性列表**
   - 图标 + 标题 + 描述
   - 支持自定义图标
   - 响应式布局

3. **操作按钮**
   - 多种按钮样式
   - 支持外部链接
   - 图标支持

## 🚀 使用方法

### 基础用法

```tsx
import ToolShowcase from "@/components/blocks/tool-showcase";

const toolShowcaseData = {
  title: "AI 工具功能展示",
  description: "探索我们强大的 AI 工具集",
  label: "功能展示",
  items: [
    {
      title: "AI 文本生成器",
      description: "使用最先进的 AI 模型生成高质量的文本内容",
      video: {
        src: "/videos/demo.mp4",
        poster: "/images/poster.jpg",
        autoplay: false,
        loop: true,
        muted: true
      },
      features: [
        {
          icon: "zap",
          title: "快速生成",
          description: "几秒钟内生成高质量内容"
        }
      ],
      buttons: [
        {
          text: "立即体验",
          url: "/tools/text-generator",
          variant: "default"
        }
      ]
    }
  ]
};

<ToolShowcase toolShowcase={toolShowcaseData} />
```

### 高级配置

#### 1. 视频配置

```typescript
video: {
  src: "/videos/demo.mp4",           // 视频文件路径
  poster: "/images/poster.jpg",      // 视频封面图
  autoplay: false,                   // 是否自动播放
  loop: true,                        // 是否循环播放
  muted: true,                       // 是否静音
  controls: false                    // 是否显示原生控件
}
```

#### 2. 布局反转

```typescript
{
  title: "功能标题",
  description: "功能描述",
  reverse: true,  // 视频在左，描述在右
  // ... 其他配置
}
```

#### 3. 功能特性

```typescript
features: [
  {
    icon: "zap",                    // 图标名称
    title: "特性标题",
    description: "特性描述"
  },
  {
    icon: "globe",
    title: "多语言支持",
    description: "支持50+种语言"
  }
]
```

#### 4. 操作按钮

```typescript
buttons: [
  {
    text: "主要按钮",
    url: "/primary-action",
    variant: "default",              // default | outline | secondary
    icon: "play"                     // 可选图标
  },
  {
    text: "次要按钮", 
    url: "/secondary-action",
    variant: "outline",
    target: "_blank"                 // 新窗口打开
  }
]
```

## 🌍 国际化支持

### 添加翻译文本

在 `i18n/messages/en.json` 和 `i18n/messages/zh.json` 中添加：

```json
{
  "common": {
    "no_media_available": "No media available",
    "play_video": "Play video",
    "pause_video": "Pause video",
    "mute_video": "Mute video",
    "unmute_video": "Unmute video",
    "video_not_supported": "Your browser does not support video playback"
  }
}
```

### 多语言内容

```typescript
const toolShowcaseData = {
  title: locale === 'zh' ? "AI 工具功能展示" : "AI Tool Features",
  description: locale === 'zh' 
    ? "探索我们强大的 AI 工具集"
    : "Explore our powerful AI tool suite",
  items: [
    {
      title: locale === 'zh' ? "AI 文本生成器" : "AI Text Generator",
      description: locale === 'zh' 
        ? "使用最先进的 AI 模型生成高质量的文本内容"
        : "Generate high-quality text content using state-of-the-art AI models",
      // ... 其他配置
    }
  ]
};
```

## 🎨 样式定制

### CSS 类名结构

```css
.tool-showcase-section {
  /* 主容器样式 */
}

.tool-showcase-header {
  /* 标题区域样式 */
}

.tool-showcase-item {
  /* 单个展示项样式 */
}

.video-player-container {
  /* 视频播放器容器 */
}

.video-controls {
  /* 视频控制按钮 */
}
```

### 自定义主题

组件使用 Tailwind CSS 和 shadcn/ui 设计系统，支持：

- 深色/浅色主题自动切换
- 自定义颜色方案
- 响应式断点
- 动画效果

## 📱 响应式设计

### 断点说明

- **移动端** (< 768px): 单列布局，视频/图片在上，描述在下
- **平板端** (768px - 1024px): 两列布局，适中间距
- **桌面端** (> 1024px): 两列布局，最大间距

### 移动端优化

- 触摸友好的按钮尺寸
- 优化的视频播放体验
- 自适应的文字大小
- 合理的间距设计

## 🔧 最佳实践

### 1. 视频优化

```typescript
// 推荐的视频配置
video: {
  src: "/videos/demo.mp4",
  poster: "/images/poster.jpg",    // 必须提供封面图
  autoplay: false,                 // 避免自动播放
  loop: true,                      // 演示视频建议循环
  muted: true,                     // 默认静音
  controls: false                  // 使用自定义控件
}
```

### 2. 内容组织

- **标题**: 简洁明了，突出核心功能
- **描述**: 详细说明功能价值和使用场景
- **特性**: 3-5 个关键特性，每个特性一句话说明
- **按钮**: 主要操作 + 次要操作，最多 2-3 个

### 3. SEO 优化

```typescript
{
  title: "具体功能名称 - 解决什么问题",
  description: "详细描述功能价值、使用场景、核心优势，包含关键词",
  features: [
    {
      title: "包含关键词的特性标题",
      description: "详细的特性说明，有助于搜索引擎理解"
    }
  ]
}
```

### 4. 性能优化

- 视频文件压缩优化
- 图片使用 WebP 格式
- 懒加载非关键内容
- 合理的视频尺寸

## 🌐 示例页面

访问演示页面查看效果：

```bash
# 英文版本
http://localhost:3001/en/tool-showcase-demo

# 中文版本  
http://localhost:3001/zh/tool-showcase-demo
```

## 📚 相关组件

- `components/blocks/feature` - 基础功能展示
- `components/blocks/showcase` - 产品展示
- `components/ui/card` - 卡片组件
- `components/ui/button` - 按钮组件

## ✅ 组件特点总结

- ✅ **SEO 友好**: 结构化内容，有利于搜索引擎优化
- ✅ **用户体验**: 直观的视频演示 + 详细的文字说明
- ✅ **响应式**: 完美适配各种设备
- ✅ **国际化**: 完整的多语言支持
- ✅ **可定制**: 灵活的配置选项
- ✅ **性能优化**: 懒加载和优化的媒体处理

这个组件非常适合用于工具网站的功能展示页面，能够有效提升用户理解和转化率！🚀
