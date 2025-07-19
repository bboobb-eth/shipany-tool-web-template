#!/bin/bash

echo "📦 Installing dependencies for MDX static blog system..."

# Install development dependencies if needed (if not already present)
pnpm add -D @types/node tsx

echo "✅ Dependencies installed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Test the MDX system: pnpm test:mdx"
echo "2. Add your MDX files to the content/blog/ directory"
echo "3. Run 'pnpm dev' to start development server"
echo "4. Run 'pnpm build' to build static pages"
echo ""
echo "📁 Example MDX files have been created in content/blog/"
echo "   - content/blog/en/getting-started.mdx"
echo "   - content/blog/zh/kuai-su-kai-shi.mdx"
echo ""
echo "🚀 Your blog will be available at:"
echo "   - /en/posts (English posts)"
echo "   - /zh/posts (Chinese posts)"
echo "   - /en/posts/[slug] (Individual posts)"
echo ""
echo "⚡ Features:"
echo "   - Static Site Generation (SSG)"
echo "   - No database required"
echo "   - Automatic slug generation"
echo "   - Multi-language support"
echo "   - Fast loading with CDN-friendly static pages"
