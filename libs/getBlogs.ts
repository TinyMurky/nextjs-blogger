import { PrismaClient } from "@prisma/client"
import type { Blog } from "@prisma/client"
import { mdx2Code } from "./mdx2Code"
const prisma = new PrismaClient()


export async function buildStaticBlogs (): Promise<Blog[]> {
  const blogs = await prisma.blog.findMany({
    select: {
      name: true,
      content: true,
      code: true
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const updatedBlogs: Blog[] = []
  for (const blog of blogs) {
    if (!blog.content) {
      continue
    }
    const { code:updatedCode } = await mdx2Code(blog.content)

    const updatedBlog = await prisma.blog.update({
      where: {
        name: blog.name
      },
      data: {
        code: updatedCode
      },

    })

    updatedBlogs.push(updatedBlog)
  }

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