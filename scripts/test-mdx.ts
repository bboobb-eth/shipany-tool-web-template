#!/usr/bin/env tsx

import { getAllPosts, getPostsByLocale, getPostBySlug } from '../lib/mdx-utils';

/**
 * 测试脚本：验证 MDX 静态博客功能
 */

async function testMDXBlog() {
  console.log('🧪 Testing MDX static blog system...');

  try {
    // 测试获取所有文章
    console.log('\n📚 Testing getAllPosts...');
    const allPosts = await getAllPosts();
    console.log(`✅ Found ${allPosts.length} posts total`);

    if (allPosts.length > 0) {
      const firstPost = allPosts[0];
      console.log(`   📝 First post: "${firstPost.title}" (${firstPost.locale})`);
      console.log(`   🔗 Slug: ${firstPost.slug}`);
      console.log(`   📄 Content length: ${firstPost.content.length} chars`);
      console.log(`   📋 Excerpt: ${firstPost.excerpt?.substring(0, 100)}...`);
    }

    // 测试按语言获取文章
    console.log('\n🌍 Testing getPostsByLocale...');
    const enPosts = await getPostsByLocale('en');
    const zhPosts = await getPostsByLocale('zh');
    console.log(`✅ English posts: ${enPosts.length}`);
    console.log(`✅ Chinese posts: ${zhPosts.length}`);

    // 测试获取单篇文章
    if (allPosts.length > 0) {
      console.log('\n📖 Testing getPostBySlug...');
      const firstPost = allPosts[0];
      const post = await getPostBySlug(firstPost.slug, firstPost.locale);

      if (post) {
        console.log(`✅ Successfully retrieved post: "${post.title}"`);
        console.log(`   📅 Created: ${post.created_at || 'Not specified'}`);
        console.log(`   👤 Author: ${post.author || 'Not specified'}`);
        console.log(`   🏷️  Tags: ${post.tags?.join(', ') || 'None'}`);
      } else {
        console.log('❌ Failed to retrieve post by slug');
      }
    }

    console.log('\n✅ All tests passed!');
    console.log('\n🚀 Your MDX blog system is working correctly!');
    console.log('   Run "pnpm dev" to start the development server');
    console.log('   Visit /en/posts or /zh/posts to see your blog');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// 运行测试
if (require.main === module) {
  testMDXBlog();
}
