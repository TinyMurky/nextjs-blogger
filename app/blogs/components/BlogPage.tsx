// import { format, parseISO } from "date-fns"
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"

import { allBlogs, Blog } from 'contentlayer/generated'
// import { allBlogs, Blog } from "@/libs/contentLayerAdapter"
import getFormattedDate from "@/libs/getFormattedDate"
import Comment from "./Comment"
import mdxComponents from "@/libs/mdxComponents"
import TableOfContents from "./TableOfContents"
import './iframe.css'
interface Props{
  // routerName:string
  blogId:string
}


// 變成static
export function generateStaticBlogPageParams(  ) {
  return allBlogs.map((blog: Blog) => {
    const urlArray = blog._raw.flattenedPath.split('/')
    return { 
      blogId: urlArray[urlArray.length - 1]
    }
  })
}

export function generateBlogPageMetadata({ blogId }: Props):Metadata {
  // 以下這Posts component叫過了，會被dedupt
  const blog = allBlogs.find((blog:Blog) => {
    const urlArray = blog._raw.flattenedPath.split('/')
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
    const urlArray = blog._raw.flattenedPath.split('/')
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
    <div className="lg:relative mx-auto w-full lg:max-w-6xl pt-24  lg:grid lg:grid-cols-5">
      <main className="lg:col-span-4 px-6 pb-24 prose md:prose-xl prose-base prose-gray prose-invert mx-auto">
        <h2 className="text-lg mt-4 mb-0">{title}</h2>
        <p className="mt-0">
          {formattedDate}
        </p>
        <article>
          {/* 用 dangerouslySetInnerHTML 直接把處理好的markdown轉html直接放入section*/}
          {/* <section dangerouslySetInnerHTML={{__html:contentHtml}} /> */}
          <MDXContent components={mdxComponents}/>
          <div className='text-sm md:text-base flex flex-row justify-between'>
            <Link href={`/blogs/${category}`}>⬅️ Go Back to {category.charAt(0).toUpperCase() + category.slice(1)}</Link>
            <Link href="#">
              Go Back to Top ⬆️
            </Link>
          </div>
        </article>
        <Comment/>
      </main>
      <aside className="lg:col-span-1 w-fit h-screen hidden lg:sticky lg:top-24 lg:block">
        <TableOfContents rawBody={body.raw} />
      </aside>
    </div>
  )
}