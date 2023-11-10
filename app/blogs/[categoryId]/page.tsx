import Posts from "../components/Posts"
import { notFound } from "next/navigation"

import { Metadata } from "next"
type Params = {
  params: {
    categoryId: string // 從url拿進來的都是string
  }
}
import { Category } from "@prisma/client"
import { getBlogs } from "@/libs/getBlogs"

function isCategory(value: string | null): value is Category {
  if (!value){
    return false
  }
  // enum 才可以這樣寫
  return Object.values(Category).includes(value as Category)
}


const blogTitle: { [key in Category]: string} = {
  [Category.insight]: "心情Blog",
  [Category.tech]: "技術Blog",
  [Category.edit]: "編輯中",
  [Category.playground]: "Playground"
}

export const revalidate = process.env.NEXT_PUBLIC_REVALIDATE_TIME || 86400

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
      <Posts title={blogTitle[categoryId]} blogs={blogs} />
    </main>
  )
}