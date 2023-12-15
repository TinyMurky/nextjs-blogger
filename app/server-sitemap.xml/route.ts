// create sitemap
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { Category } from "@prisma/client"
import prisma from "@/libs/db"

const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const dynamicUrl: ISitemapField[] = []
  const blogs = await prisma.blog.findMany({
    select: {
      name: true,
      category: true,
      updatedAt: true
    }
  })

  for (const blog of blogs) {
    const categoryString:string = Category[blog.category]
    const url = 
    {
      loc: `${siteUrl}/blogs/${categoryString}/${blog.name}`,
      lastmod: blog.updatedAt.toISOString(),
      // changefreq
      // priority
    }
    dynamicUrl.push(url)
  }
  return getServerSideSitemap(dynamicUrl)
}