import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/db"
import { mdx2Code } from "@/libs/mdx2Code"
import { revalidatePath } from 'next/cache'


type Props = {
  params: {
    blogId: string
  }
}

const auth = (req: Request) => ({ id: "1", email: "murky0830@gmail.com" })

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

export async function PUT(request: NextRequest, { params }: Props) {
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

    revalidatePath('/', 'layout')
    // revalidatePath(`/blogs/${updatedBlog.category}`, 'page')
    // revalidatePath(`/blogs/${updatedBlog.category}/${updatedBlog.name}`, 'page')
    // revalidatePath(`/edit/${updatedBlog.name}`, 'page')

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

export async function DELETE(request: NextRequest, { params }: Props) {
  try{
    const { blogId } = params

    const userData = await auth(request)

    const user = await prisma.user.findUnique({
      where: {
        email: userData.email
      }
    })

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized Delete' }, {
        status: 401,
        statusText: 'Unauthorized',
      })
    }

    const deleteUser = await prisma.blog.delete({
      where: {
        name: blogId,
      }
    })

    if (!deleteUser) {
      return NextResponse.json({message: "Delete failed, blog not found"}, {
        status: 404,
        statusText: 'Not Found',
      })
    }

    revalidatePath('/', 'layout')

    return NextResponse.json({message: "Delete successed!"}, {
      status: 200,
      statusText: 'ok',
    })
  } catch(error) {
    console.log(error)
    return NextResponse.json(error, {
      status: 500,
      statusText: 'Internal Sever Error',
    })
  }
}
