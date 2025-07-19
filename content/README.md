# Content Directory

This directory contains all the MDX blog posts that will be automatically processed during build time.

## Directory Structure

```
content/
├── blog/
│   ├── en/                 # English blog posts
│   │   ├── getting-started.mdx
│   │   ├── advanced-features.mdx
│   │   └── deployment-guide.mdx
│   └── zh/                 # Chinese blog posts
│       ├── kuai-su-kai-shi.mdx
│       ├── gao-ji-gong-neng.mdx
│       └── bu-shu-zhi-nan.mdx
├── .content-cache.json     # Auto-generated cache file (do not edit)
└── README.md              # This file
```

## MDX File Format

Each MDX file should have the following frontmatter structure:

```mdx
---
title: "Your Blog Post Title"
description: "A brief description of your post"
author: "Author Name"
author_avatar: "/avatars/author.jpg"
cover_image: "/blog/cover-image.jpg"
slug: "your-post-slug"
status: "online"  # online, offline, created
tags: ["tag1", "tag2", "tag3"]
created_at: "2024-01-15T10:00:00Z"
---

# Your Blog Content

Write your blog content here using Markdown syntax...
```

## Required Fields

- `title`: The title of your blog post
- `slug`: URL-friendly identifier (will be auto-generated from title if not provided)

## Optional Fields

- `description`: Meta description for SEO
- `author`: Author name
- `author_avatar`: Path to author avatar image
- `cover_image`: Path to cover image
- `status`: Post status (`online`, `offline`, `created`) - defaults to `online`
- `tags`: Array of tags
- `created_at`: ISO timestamp - defaults to current time
- `updated_at`: Auto-generated during processing

## Language Support

The locale is automatically determined from the directory structure:
- Files in `content/blog/en/` will have locale `en`
- Files in `content/blog/zh/` will have locale `zh`
- Add more language directories as needed

## Build Process

1. **File Scanning**: The build script scans all `.mdx` files in the content directory
2. **Change Detection**: Only processes files that have changed since last build
3. **Content Processing**: Parses frontmatter and converts MDX to Markdown
4. **Database Update**: Creates or updates posts in the database
5. **Cache Update**: Updates the cache file to track processed files

## Commands

- `pnpm build:content` - Process content files only
- `pnpm build` - Process content files and build the application
- `pnpm dev` - Start development server (content is processed on each build)

## Tips

1. **Slug Uniqueness**: Make sure each slug is unique within its locale
2. **Image Paths**: Use absolute paths starting with `/` for images
3. **File Naming**: Use kebab-case for file names (e.g., `getting-started.mdx`)
4. **Content Cache**: The `.content-cache.json` file tracks processed files - don't edit it manually
5. **Incremental Builds**: Only changed files are processed, making builds fast

## Troubleshooting

- **Build Errors**: Check the console output for validation errors
- **Missing Posts**: Ensure frontmatter is properly formatted
- **Duplicate Slugs**: Each slug must be unique within its locale
- **Cache Issues**: Delete `.content-cache.json` to force reprocessing all files
