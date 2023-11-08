import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type Props = {
  params: {
    blogId: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const { blogId } = params
  const blog = await prisma.blog.findUnique({
    where: {
      name: blogId,
    }
  })

  if (!blog) {
    return new NextResponse(null, {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return new NextResponse(JSON.stringify(blog), {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json'
    }
  })

}