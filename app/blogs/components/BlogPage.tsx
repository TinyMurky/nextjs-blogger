import { getSortedPostsData, getPostData } from "@/libs/posts"
import getFormattedDate from "@/libs/getFormattedDate"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import Comment from "./Comment"

interface Props{
  routerName:string
  blogId:string
}


// 變成static
export function generateStaticBlogPageParams( routerName: string ) {
  const blogs:Blog[] = getSortedPostsData(`/public/blogs/${routerName}`, 'md')

  return blogs.map(blog=>{
    return {
      blogId:blog.id
    }
  })
}

export function generateBlogPageMetadata({ routerName, blogId }: Props):Metadata {
  // 以下這Posts component叫過了，會被dedupt
  const blogs:Blog[] = getSortedPostsData(`/public/blogs/${routerName}`, 'md')
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

export default async function BlogPost({ routerName, blogId }: Props) {

  // 以下這Posts component叫過了，會被dedupt
  const blogs:Blog[] = getSortedPostsData(`/public/blogs/${routerName}`, 'md')
  
  const blog = blogs.find(blog => blog.id === blogId)
  if ( !blog ) {
    return notFound()
  }
  const {category, title, date, contentHtml} = await getPostData(blog)
  const formattedDate:string = getFormattedDate(date)

  return (
    <div className="lg:relative w-full pt-24  lg:grid lg:grid-cols-4">
      <aside className="lg:col-span-1">
      </aside>
      <main className="lg:col-span-2 px-6 prose md:prose-xl prose-base prose-gray dark:prose-invert mx-auto">
        <h2 className="text-lg mt-4 mb-0">{title}</h2>
        <p className="mt-0">
          {formattedDate}
        </p>
        <article>
          {/* 用 dangerouslySetInnerHTML 直接把處理好的markdown轉html直接放入section*/}
          <section dangerouslySetInnerHTML={{__html:contentHtml}} />
          <p>
            <Link href={`/blogs${category}`}>⬅️ Go Back to {category.charAt(1).toUpperCase() + category.slice(2)}</Link>
          </p>
        </article>
      </main>
      <aside className="lg:col-span-1 w-fit h-screen">
        <Comment/>
      </aside>
    </div>
  )
}