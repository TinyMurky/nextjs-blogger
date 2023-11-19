import Posts from "../components/Posts"
import { notFound } from "next/navigation"
import { isCategory } from "@/libs/db"
import { Metadata } from "next"
type Params = {
  params: {
    categoryId: string // 從url拿進來的都是string
  }
}
import { Category } from "@prisma/client"
import { getBlogs } from "@/libs/getBlogs"

const blogTitle: { [key in Category]: string} = {
  [Category.insight]: "心情Blog",
  [Category.tech]: "技術Blog",
  [Category.edit]: "編輯中",
  [Category.playground]: "MD File 線上編輯"
}

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 86400

export function generateStaticParams(  ) {
  return Object.keys(Category).map((categoryId: string) => {
    return { 
      categoryId
    }
  })
}

export function generateMetadata({ params:{ categoryId } }: Params):Metadata {
  // 以下這Posts component叫過了，會被dedupt
  if (!isCategory(categoryId)) {
    return {
      title: "Not Found",
    }
  }
  return {
    title: blogTitle[categoryId]
  }
}




export default async function page({ params:{ categoryId } }: Params) {
  if (!isCategory(categoryId)) {
    return notFound()
  }

  const blogs = await getBlogs(categoryId)

  return (
    <main>
      <Posts title={blogTitle[categoryId]} category={categoryId} blogs={blogs} />
    </main>
  )
}