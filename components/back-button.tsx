"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface BackButtonProps {
  fallbackUrl?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BackButton({
  fallbackUrl = "/posts",
  className = "",
  children
}: BackButtonProps) {
  const router = useRouter();
  const t = useTranslations('blog');

  const handleBack = () => {
    // 尝试使用浏览器的后退功能
    if (window.history.length > 1) {
      router.back();
    } else {
      // 如果没有历史记录，跳转到指定的回退URL
      router.push(fallbackUrl);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center gap-2 hover:bg-muted transition-colors ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {children || t('back')}
    </Button>
  );
}
