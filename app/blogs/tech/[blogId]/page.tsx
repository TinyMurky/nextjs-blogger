import { getSortedPostsData, getPostData } from "@/libs/posts"
import getFormattedDate from "@/libs/getFormattedDate"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"

interface Params {
  params: {
    blogId: string // 從url拿進來的都是string
  }
}

// 變成static
export function generateStaticParams() {
  const blogs:Blog[] = getSortedPostsData('/public/blogs', 'md')

  return blogs.map(blog=>{
    return {
      blogId:blog.id
    }
  })
}

export function generateMetadata({ params: { blogId } }: Params):Metadata {
  // 以下這Posts component叫過了，會被dedupt
  const blogs:Blog[] = getSortedPostsData('/public/blogs', 'md')
  
  const blog = blogs.find(blog => blog.id === blogId)
  if ( !blog ) {
    return {
      title: "Not Found",
    }
  }
  return {
    title: blog.title,
  }
}

export default async function Post({ params: { blogId } }: Params) {
  // 以下這Posts component叫過了，會被dedupt
  const blogs:Blog[] = getSortedPostsData('/public/blogs', 'md')
  
  const blog = blogs.find(blog => blog.id === blogId)
  if ( !blog ) {
    return notFound()
  }

  const {category, title, date, contentHtml} = await getPostData(blog)
  const formattedDate:string = getFormattedDate(date)

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">
        {formattedDate}
      </p>
      <article>
        {/* 用 dangerouslySetInnerHTML 直接把處理好的markdown轉html直接放入section*/}
        <section dangerouslySetInnerHTML={{__html:contentHtml}} />
        <p>
          <Link href={`/blog${category}`}>⬅️ Go Back to {category.charAt(1).toUpperCase() + category.slice(2)}</Link>
        </p>
      </article>
    </main>
  )
}