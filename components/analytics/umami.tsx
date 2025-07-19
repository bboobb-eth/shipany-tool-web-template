"use client";

import Script from "next/script";
import { useEffect } from "react";

// Umami 事件追踪接口
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export default function UmamiAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  if (!websiteId || !scriptUrl) {
    return null;
  }

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
      onLoad={() => {
        // 脚本加载完成后的回调
        console.log("Umami Analytics loaded");
      }}
    />
  );
}

// Umami 事件追踪 Hook
export function useUmamiTrack() {
  const track = (eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track(eventName, eventData);
    }
  };

  return { track };
}

// 预定义的事件追踪函数
export const umamiEvents = {
  // 用户注册
  signUp: (method: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("sign-up", { method });
    }
  },

  // 用户登录
  signIn: (method: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("sign-in", { method });
    }
  },

  // 博客文章阅读
  readBlogPost: (slug: string, locale: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("blog-read", { slug, locale });
    }
  },

  // 支付事件
  purchase: (amount: number, currency: string, product: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("purchase", { amount, currency, product });
    }
  },

  // API 调用
  apiCall: (endpoint: string, method: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("api-call", { endpoint, method });
    }
  },

  // 主题切换
  themeChange: (theme: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("theme-change", { theme });
    }
  },

  // 语言切换
  languageChange: (language: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("language-change", { language });
    }
  },

  // 下载事件
  download: (fileName: string, fileType: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("download", { fileName, fileType });
    }
  },

  // 外部链接点击
  externalLink: (url: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("external-link", { url });
    }
  },

  // 搜索事件
  search: (query: string, results: number) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("search", { query, results });
    }
  },
};
