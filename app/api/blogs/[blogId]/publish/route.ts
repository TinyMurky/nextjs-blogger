import { NextRequest, NextResponse } from "next/server"
import prisma, { isCategory } from "@/libs/db"
import { revalidatePath } from "next/cache"
import { allowPublishedToCategory } from "@/libs/allowList"


type Props = {
  params: {
    blogId: string
  }
}

const auth = (req: Request) => ({ id: "1", email: "murky0830@gmail.com" })

export async function POST(request: NextRequest, { params }: Props) {
  const { blogId } = params
  const { category } = await request.json()
  const userData = await auth(request)

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email
    }
  })

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized Publish' }, {
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  if (!(isCategory(category) && allowPublishedToCategory.includes(category))) {
    return NextResponse.json({ message: 'Category does not exist' }, {
      status: 400,
      statusText: 'Bad Request',
    })
  }

  try{
    const updatedBlog = await prisma.blog.update({
      where: {
        authorId: user.id,
        name: blogId,
      },
      data:  {
        published: true,
        category: category
      }
    })

    if (!updatedBlog) {
      return NextResponse.json({ message: 'Can\'t find blog, Blog publishing has Failed' }, {
        status: 404,
        statusText: 'Not found',
      })
    }

    revalidatePath('/', 'layout')

    return NextResponse.json({ message: 'Blog published!' }, {
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