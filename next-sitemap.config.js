/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // 給更大網佔用的
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // <= for dynamic
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/server-sitemap.xml`, // <==== Add here
    ],
  },
}