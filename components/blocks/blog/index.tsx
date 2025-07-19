import { ArrowRight } from "lucide-react";
import { Blog as BlogType } from "@/types/blocks/blog";
import { SVGAvatar } from "@/components/avatar-generator";
import { useTranslations } from "next-intl";

export default function Blog({ blog }: { blog: BlogType }) {
  const t = useTranslations('blog');

  if (blog.disabled) {
    return null;
  }

  return (
    <section className="w-full py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          {blog.label && (
            <p className="mb-6 text-xs font-medium uppercase tracking-wider text-primary">
              {blog.label}
            </p>
          )}
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            {blog.title}
          </h2>
          {blog.description && (
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {blog.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.items?.map((item, idx) => (
            <a
              key={idx}
              href={item.url || `/${item.locale}/posts/${item.slug}`}
              target={item.target || "_self"}
              className="group block"
            >
              <article className="h-full flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 group-hover:border-primary/50">
                {item.cover_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.cover_url}
                      alt={item.title || ""}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* 作者和日期信息 */}
                  {(item.author_name || item.created_at) && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <SVGAvatar
                        name={item.author_name || t('anonymous')}
                        size={24}
                      />
                      <div>
                        {item.author_name && <span className="font-medium">{item.author_name}</span>}
                        {item.created_at && (
                          <span className={item.author_name ? "ml-2" : ""}>
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {blog.read_more_text && (
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      {blog.read_more_text}
                      <ArrowRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
