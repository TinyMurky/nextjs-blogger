import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/db"

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