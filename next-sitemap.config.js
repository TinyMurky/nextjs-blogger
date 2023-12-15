/** @type {import('next-sitemap').IConfig} */

const siteUrl =  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false, // 給更大網佔用的
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // <= for dynamic
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`, // <==== Add here
    ],
  },
}