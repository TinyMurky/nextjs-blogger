import { PrismaClient } from "@prisma/client"
import type { Blog } from "@prisma/client"
import { mdx2Code } from "./mdx2Code"
const prisma = new PrismaClient()


export async function buildStaticBlogs (): Promise<Blog[]> {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
  })

  const updatePromises = blogs.map(async (blog) => {
    if (!blog.content) return blog
    const { code: updatedCode } = await mdx2Code(blog.content)

    return prisma.blog.update({
      where: { name: blog.name },
      data: { code: updatedCode },
    })
  })

  const updatedBlogs = (await Promise.all(updatePromises)).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)

  return updatedBlogs

}

export async function getBlogs(category :string | null = null): Promise<Blog[]> {

  // 有category就用category

  let whereCondition = {}

  if (category) {
    whereCondition = {
      category: {
        equals: category,
      },
    }
  }

  const blogs = await prisma.blog.findMany({
    where: whereCondition,
    orderBy: {
      createdAt: 'desc'
    },
  })

  return blogs
}

export async function getBlogByName ( name: string ) {
  const blog = await prisma.blog.findUnique({
    where: {
      name: name
    },
  })

  return blog
}