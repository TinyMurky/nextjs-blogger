/** @type {import('next-sitemap').IConfig} */

const sitemap = process.env.NEXT_PUBLIC_API_URL || 'https://nextjs-blogger-production.up.railway.app'
module.exports = {
  siteUrl: sitemap,
  generateRobotsTxt: true,
  generateIndexSitemap: false, // 給更大網佔用的
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // <= for dynamic
  robotsTxtOptions: {
    additionalSitemaps: [
      `${sitemap || 'http://localhost:3000'}/server-sitemap.xml`, // <==== Add here
    ],
  },
}