import { NextRequest, NextResponse } from "next/server"
import { format } from 'date-fns'
import prisma, { isCategory } from "@/libs/db"
import { mdx2Code } from "@/libs/mdx2Code"
import { revalidatePath } from "next/cache"
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

export async function POST(request: NextRequest) {
  const { name, title, category }: {name: string, title: string, category: string} = await request.json()
  if (!name || !title || !category) {
    return new NextResponse(JSON.stringify({message: "Invalid name or title or category"}), {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const mdx = defaultMdx(title)
  const { code, frontmatter } = await mdx2Code(mdx)
  const newBlog = await prisma.blog.create({
    data: {
      name: name,
      authorId: 1, // 先寫死
      title: frontmatter.title,
      published: false,
      category: isCategory(category) ? category : "edit",
      content: mdx,
      code: code,
      createdAt:new Date(frontmatter.date)
    }
  })

  if (!newBlog) {
    return new NextResponse(JSON.stringify({message: "Create blog failed"}), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  revalidatePath(`/blogs/${category}/${name}`, 'page')
  revalidatePath(`/edit/${name}`, 'page')
  return new NextResponse(JSON.stringify({message: "Create blog successed"}), {
      status: 200,
      statusText: 'ok',
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

function defaultMdx(title: string): string {
  const date:string = format(new Date(), 'yyyy-MM-dd')
  const mdx = `---
title: ${title}
description: 
date: ${date}
tag: 
readTime: 
cover: 
slug: 
---

請於此開始撰寫文章

mdx上方的欄位請務必於冒號後增加空格再更改內容，此外請不要打太短的內容，會影響畫面顯示
`
  return mdx
}

