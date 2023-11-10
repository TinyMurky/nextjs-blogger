// import BlogPost, {generateBlogPageMetadata, generateStaticBlogPageParams} from "../../components/BlogPage"
import { Blog } from '@prisma/client'
import {getMDXComponent} from 'mdx-bundler/client'
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"

import getFormattedDate from "@/libs/getFormattedDate"
import Comment from '../../components/Comment'
import mdxComponents from "@/libs/mdxComponents"
import TableOfContents from '../../components/TableOfContents'
import '../../components/iframe.css'
import { getBlogByName, buildStaticBlogs, getBlogs } from '@/libs/getBlogs'
type Params = {
  params: {
    categoryId: string,
    blogId: string // 從url拿進來的都是string
  }
}

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 86400

// 變成static

export async function generateStaticParams() {
  const blogs = await buildStaticBlogs()
  // const blogs = await getBlogs()
  return blogs.map((blog: Blog) => blog.name)
}

export async function generateMetadata({ params: { blogId } }: Params):Promise<Metadata> {
  // const blogs = await buildStaticBlogs()
  // const blogs = await getBlogs()
  // const blog = blogs.find(blog => blog.name == blogId)
  const blog = await getBlogByName(blogId)

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

  // const blogs = await buildStaticBlogs()
  // const blogs = await getBlogs()
  // const blog = blogs.find(blog => blog.name == blogId)
  const blog = await getBlogByName(blogId)
  if ( !blog ) {
    return notFound()
  }
  const {name, category, title, createdAt, content, code} = blog
  const MDXContent = getMDXComponent(code)
  const formattedDate:string = getFormattedDate(createdAt.toDateString())
  return (
    <div className="lg:relative mx-auto w-full lg:max-w-6xl pt-24  lg:grid lg:grid-cols-5">
      <main className="lg:col-span-4 px-6 pb-24 prose md:prose-xl prose-base prose-gray prose-invert mx-auto">
        <h2 className="text-lg mt-4 mb-0">{title}</h2>
        <div className='p-0 mt-0 flex flex-row justify-between items-center'>
          <p className="">
            {formattedDate}
          </p>
          <Link href={`/edit/${name}`} prefetch={true} className='px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>
        </div>
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
        <TableOfContents rawBody={content ? content : ""} />
      </aside>
    </div>
  )
}