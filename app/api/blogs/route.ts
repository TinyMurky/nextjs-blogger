import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET() {
  const blog = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: { // 回傳欄位
      category: true,
      content: true,
      name: true
    }
  })

  return new NextResponse(JSON.stringify(blog), {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json'
    }
  })

}