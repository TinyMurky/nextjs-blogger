import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'
import { mdx2Code } from "@/libs/mdx2Code"
import { revalidatePath } from 'next/cache'
const prisma = new PrismaClient()


type Props = {
  params: {
    blogId: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const { blogId } = params
  try{
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
  } catch(error) {
    console.log(error)
    return NextResponse.json(error, {
      status: 500,
      statusText: 'Internal Sever Error',
    })
  }
}

export async function POST(request: NextRequest, { params }: Props) {
  const { blogId } = params
  const content = await request.json()

  const {code, frontmatter} = await mdx2Code(content)

  try{
    const updatedBlog = await prisma.blog.update({
      where: {
        name: blogId,
      },
      data:  {
        title: frontmatter.title,
        description: frontmatter.description,
        content: content,
        code: code,
        tag: frontmatter.tag,
        readTime: frontmatter.readTime,
        cover: frontmatter.cover,
        slug: frontmatter.slug,
        createdAt:new Date(frontmatter.date)
      }
    })

    if (!updatedBlog) {
      return NextResponse.json({ message: 'Can\'t find blog, Blog saving has Failed' }, {
        status: 404,
        statusText: 'Not found',
      })
    }

    revalidatePath('/', 'page')
    revalidatePath(`/blogs/${updatedBlog.category}`, 'page')
    revalidatePath(`/blogs/${updatedBlog.category}/${updatedBlog.name}`, 'page')

    return NextResponse.json({ message: 'Blog saved!' }, {
      status: 200,
      statusText: 'OK',
    })

  } catch(error) {
    console.log(error)
    return NextResponse.json(error, {
      status: 500,
      statusText: 'Internal Sever Error',
    })
  }
}