# 📊 Umami Analytics 集成指南

## 🎯 概述

已为 ShipAny 项目集成了 Umami Analytics，这是一个开源、隐私友好的网站分析工具。Umami 提供了与 Google Analytics 类似的功能，但更注重用户隐私保护。

## ✨ 特性

- 🔒 **隐私友好**: 不使用 cookies，符合 GDPR 规范
- 📊 **实时数据**: 实时访问统计和用户行为分析
- 🎨 **自定义事件**: 支持自定义事件追踪
- 🌍 **开源**: 完全开源，可自托管
- ⚡ **轻量级**: 脚本体积小，加载速度快

## 🚀 快速开始

### 1. 获取 Umami 账户

#### 选项 A: 使用 Umami Cloud (推荐)
1. 访问 [Umami Cloud](https://cloud.umami.is/)
2. 注册账户并创建网站
3. 获取 Website ID 和 Script URL

#### 选项 B: 自托管 Umami
1. 部署 Umami 到您的服务器
2. 创建网站并获取追踪代码
3. 记录您的 Umami 实例 URL

### 2. 配置环境变量

在您的 `.env.local` 文件中添加：

```env
# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-website-id"
NEXT_PUBLIC_UMAMI_SCRIPT_URL="https://cloud.umami.is/script.js"
```

#### 自托管示例：
```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-website-id"
NEXT_PUBLIC_UMAMI_SCRIPT_URL="https://your-umami-domain.com/script.js"
```

### 3. 验证集成

1. 启动开发服务器：`pnpm dev`
2. 在生产模式下测试：`pnpm build && pnpm start`
3. 访问您的网站，检查 Umami 仪表板是否显示访问数据

## 📈 功能特性

### 自动追踪

Umami 组件会自动追踪：
- ✅ 页面浏览量
- ✅ 用户会话
- ✅ 访问来源
- ✅ 设备信息
- ✅ 地理位置

### 自定义事件追踪

项目已预定义了多种事件追踪：

#### 用户行为事件
```typescript
import { umamiEvents } from "@/components/analytics/umami";

// 用户注册
umamiEvents.signUp("google");

// 用户登录
umamiEvents.signIn("email");

// 博客阅读
umamiEvents.readBlogPost("getting-started", "en");
```

#### 业务事件
```typescript
// 支付事件
umamiEvents.purchase(29.99, "USD", "pro-plan");

// API 调用
umamiEvents.apiCall("/api/generate", "POST");

// 主题切换
umamiEvents.themeChange("dark");
```

#### 交互事件
```typescript
// 外部链接点击
umamiEvents.externalLink("https://github.com/shipanyai");

// 文件下载
umamiEvents.download("user-guide.pdf", "pdf");

// 搜索事件
umamiEvents.search("AI SaaS", 15);
```

### 自定义事件追踪 Hook

```typescript
import { useUmamiTrack } from "@/components/analytics/umami";

function MyComponent() {
  const { track } = useUmamiTrack();

  const handleCustomEvent = () => {
    track("custom-event", {
      category: "user-interaction",
      value: 100,
      label: "button-click"
    });
  };

  return <button onClick={handleCustomEvent}>Track Me</button>;
}
```

## 🔧 高级配置

### 环境变量说明

| 变量名 | 描述 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami 网站 ID | `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"` |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | Umami 脚本 URL | `"https://cloud.umami.is/script.js"` |

### 自托管配置

如果您使用自托管的 Umami：

```env
# 自托管 Umami 配置
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-website-id"
NEXT_PUBLIC_UMAMI_SCRIPT_URL="https://analytics.yourdomain.com/script.js"
```

### 开发环境配置

默认情况下，Umami 只在生产环境中加载。如需在开发环境中测试：

```typescript
// 修改 components/analytics/umami.tsx
export default function UmamiAnalytics() {
  // 注释掉这行以在开发环境中启用
  // if (process.env.NODE_ENV !== "production") {
  //   return null;
  // }
  
  // ... 其余代码
}
```

## 📊 数据分析

### Umami 仪表板功能

1. **实时访客**: 当前在线用户数
2. **页面浏览**: 页面访问统计
3. **访问来源**: 流量来源分析
4. **设备统计**: 设备、浏览器、操作系统
5. **地理分布**: 访客地理位置
6. **自定义事件**: 您定义的事件统计

### 常用分析指标

- **PV (Page Views)**: 页面浏览量
- **UV (Unique Visitors)**: 独立访客数
- **会话时长**: 用户停留时间
- **跳出率**: 单页面访问比例
- **转化率**: 目标事件完成率

## 🔒 隐私保护

### Umami 的隐私优势

1. **无 Cookies**: 不使用任何 cookies
2. **匿名数据**: 不收集个人身份信息
3. **GDPR 合规**: 符合欧盟数据保护法规
4. **数据控制**: 自托管时完全控制数据

### 隐私政策建议

在您的隐私政策中添加：

```
我们使用 Umami Analytics 来分析网站使用情况。Umami 是一个隐私友好的分析工具，
不使用 cookies，不收集个人身份信息，所有数据都是匿名的。
```

## 🚀 部署注意事项

### Vercel 部署

Umami 在 Vercel 上开箱即用，无需额外配置。

### 自托管部署

确保您的 Umami 脚本 URL 可以被公开访问。

### CDN 配置

如果使用 CDN，确保 Umami 脚本可以正常加载。

## 🐛 故障排除

### 常见问题

1. **数据不显示**
   - 检查环境变量是否正确设置
   - 确认在生产环境中运行
   - 验证 Website ID 是否正确

2. **脚本加载失败**
   - 检查 Script URL 是否可访问
   - 确认没有被广告拦截器阻止
   - 检查 CSP 策略是否允许脚本加载

3. **自定义事件不工作**
   - 确认 Umami 脚本已加载
   - 检查浏览器控制台是否有错误
   - 验证事件名称和数据格式

### 调试技巧

```typescript
// 在浏览器控制台中检查 Umami 是否加载
console.log(window.umami);

// 手动触发事件测试
window.umami?.track("test-event", { test: true });
```

## 📚 参考资源

- [Umami 官方文档](https://umami.is/docs)
- [Umami GitHub](https://github.com/umami-software/umami)
- [Umami Cloud](https://cloud.umami.is/)
- [自托管指南](https://umami.is/docs/install)

## ✅ 集成完成

Umami Analytics 已成功集成到 ShipAny 项目中：

- ✅ 自动页面追踪
- ✅ 自定义事件系统
- ✅ 隐私友好设计
- ✅ 生产环境优化
- ✅ 博客阅读追踪示例

现在您可以享受强大而隐私友好的网站分析功能！🎉
