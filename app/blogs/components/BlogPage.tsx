import { format, parseISO } from "date-fns"
import { allBlogs, Blog } from "@/libs/contentLayerAdapter"
import { getMDXComponent } from 'next-contentlayer/hooks'

import getFormattedDate from "@/libs/getFormattedDate"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import Comment from "./Comment"

interface Props{
  // routerName:string
  blogId:string
}


// 變成static
export function generateStaticBlogPageParams(  ) {
  return allBlogs.map((blog: Blog) => {
    const urlArray = blog._raw.sourceFileDir.split('/')
    return { 
      blogId: urlArray[urlArray.length - 1]
    }
  })
}

export function generateBlogPageMetadata({ blogId }: Props):Metadata {
  // 以下這Posts component叫過了，會被dedupt
  const blog = allBlogs.find((blog:Blog) => {
    const urlArray = blog._raw.sourceFileDir.split('/')
    return urlArray[urlArray.length - 1] === blogId
  })
  if ( !blog ) {
    return {
      title: "Not Found",
    }
  }
  return {
    title: blog.title,
  }
}

export default async function BlogPost({ blogId }: Props) {

  // 以下這Posts component叫過了，會被dedupt
  const blog = allBlogs.find((blog:Blog) => {
    const urlArray = blog._raw.sourceFileDir.split('/')
    return urlArray[urlArray.length - 1] === blogId
  })
  if ( !blog ) {
    return notFound()
  }
  const {_raw, title, date, body} = blog
  const MDXContent = getMDXComponent(body.code)
  const formattedDate:string = getFormattedDate(date)
  const category = _raw.flattenedPath.split('/')[0]
  return (
    <div className="lg:relative w-full pt-24  lg:grid lg:grid-cols-4">
      <aside className="lg:col-span-1">
      </aside>
      <main className="lg:col-span-2 px-6 pb-24 prose md:prose-xl prose-base prose-gray dark:prose-invert mx-auto">
        <h2 className="text-lg mt-4 mb-0">{title}</h2>
        <p className="mt-0">
          {formattedDate}
        </p>
        <article>
          {/* 用 dangerouslySetInnerHTML 直接把處理好的markdown轉html直接放入section*/}
          {/* <section dangerouslySetInnerHTML={{__html:contentHtml}} /> */}
          <MDXContent/>
          <p>
            <Link href={`/blogs/${category}`}>⬅️ Go Back to {category.charAt(0).toUpperCase() + category.slice(1)}</Link>
          </p>
        </article>
        <Comment/>
      </main>
      <aside className="lg:col-span-1 w-fit h-screen">
      </aside>
    </div>
  )
}