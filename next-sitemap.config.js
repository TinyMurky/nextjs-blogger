/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // 給更大網佔用的
  sitemapSize: 7000,
}