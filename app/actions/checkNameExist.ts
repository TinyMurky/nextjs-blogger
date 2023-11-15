'use server'
import prisma from "@/libs/db"

export default async function isBlogNameExisted( blogName: string ): Promise<boolean> {
  const blog = await prisma.blog.findUnique({
    where: {
      name: blogName
    }
  })

  return blog ? true : false
}