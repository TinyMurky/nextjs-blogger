import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/db"
import { mdx2Code } from "@/libs/mdx2Code"
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/libs/authOptions"

type Props = {
  params: {
    blogId: string
  }
}

const PLAYGROUND_AUTHOR_ID = -1

export async function PUT(request: NextRequest, { params }: Props) {
  const { blogId } = params
  const content = await request.json()
  const {code, frontmatter} = await mdx2Code(content)

  const urlArray = request.url.split('/')
  const playgroundPositionInUrl = urlArray.length -2
  const isPlayground = urlArray[playgroundPositionInUrl] === "playground"
  // 登入的session
  const session = await getServerSession(authOptions)

  try{
    const updatedBlog = await prisma.blog.update({
      where: {
        name: blogId,
        authorId: isPlayground ?  PLAYGROUND_AUTHOR_ID : session?.user?.id ? session.user.id :  PLAYGROUND_AUTHOR_ID // 沒有session就只能刪playground的
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
    // 登入的session
    const session = await getServerSession(authOptions)

    const urlArray = request.url.split('/')
    const playgroundPositionInUrl = urlArray.length -2
    const isPlayground = urlArray[playgroundPositionInUrl] === "playground"

    const { blogId } = params


    const deleteBlog = await prisma.blog.delete({
      where: {
        name: blogId,
        authorId: isPlayground ?  PLAYGROUND_AUTHOR_ID : session?.user?.id ? session.user.id :  PLAYGROUND_AUTHOR_ID // 沒有session就只能刪playground的
      }
    })

    if (!deleteBlog) {
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
