import UmamiTest from "@/components/analytics/umami-test";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return {
    title: "Umami Analytics Test",
    description: "Test page for Umami Analytics integration",
    robots: "noindex, nofollow", // 防止搜索引擎索引测试页面
  };
}

export default async function UmamiTestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <section className="py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Umami Analytics 测试页面
          </h1>
          <p className="text-muted-foreground">
            这是一个用于测试 Umami Analytics 集成的页面。
            只有在开发和测试环境中才应该访问此页面。
          </p>
        </div>
        
        <UmamiTest />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            💡 提示：在生产环境中，建议删除或隐藏此测试页面
          </p>
        </div>
      </div>
    </section>
  );
}
