"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { umamiEvents, useUmamiTrack } from "./umami";
import { useState } from "react";

export default function UmamiTest() {
  const { track } = useUmamiTrack();
  const [eventCount, setEventCount] = useState(0);

  const testEvents = [
    {
      name: "Sign Up Test",
      action: () => umamiEvents.signUp("test"),
      description: "测试用户注册事件"
    },
    {
      name: "Sign In Test", 
      action: () => umamiEvents.signIn("test"),
      description: "测试用户登录事件"
    },
    {
      name: "Blog Read Test",
      action: () => umamiEvents.readBlogPost("test-post", "en"),
      description: "测试博客阅读事件"
    },
    {
      name: "Theme Change Test",
      action: () => umamiEvents.themeChange("dark"),
      description: "测试主题切换事件"
    },
    {
      name: "Purchase Test",
      action: () => umamiEvents.purchase(29.99, "USD", "test-product"),
      description: "测试购买事件"
    },
    {
      name: "Custom Event Test",
      action: () => {
        track("custom-test-event", {
          timestamp: Date.now(),
          count: eventCount + 1,
          source: "test-component"
        });
        setEventCount(prev => prev + 1);
      },
      description: "测试自定义事件"
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🧪 Umami Analytics 测试</CardTitle>
        <CardDescription>
          点击下面的按钮来测试各种 Umami 事件追踪功能。
          请在 Umami 仪表板中查看实时事件数据。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {testEvents.map((event, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={event.action}
              className="h-auto p-4 flex flex-col items-start text-left"
            >
              <span className="font-semibold">{event.name}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {event.description}
              </span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">📊 测试说明</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 确保已在 .env.local 中配置 Umami 环境变量</li>
            <li>• 在生产环境中运行以查看实际效果</li>
            <li>• 事件可能需要几分钟才会在仪表板中显示</li>
            <li>• 自定义事件计数: <strong>{eventCount}</strong></li>
          </ul>
        </div>

        <div className="mt-4 p-4 border rounded-lg">
          <h4 className="font-semibold mb-2">🔧 调试信息</h4>
          <div className="text-sm space-y-1">
            <p>环境: <code>{process.env.NODE_ENV}</code></p>
            <p>Umami 状态: <code>{typeof window !== 'undefined' && window.umami ? '已加载' : '未加载'}</code></p>
            <p>Website ID: <code>{process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? '已配置' : '未配置'}</code></p>
            <p>Script URL: <code>{process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ? '已配置' : '未配置'}</code></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
