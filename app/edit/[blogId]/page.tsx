import { Category } from "@prisma/client"
import { notFound } from "next/navigation"
import MdxEditor from "../components/mdxEditor"
import { buildStaticBlogs, getBlogByName } from "@/libs/getBlogs"
type Props = {
  params: {
    blogId: string
  }
}


export async function generateStaticParams() {
  const blogs = await buildStaticBlogs()
  const blogIds = blogs.map( blog => blog.name)
  return blogIds
}


export default async function Edit( { params: { blogId } }: Props) {
  const blog = await getBlogByName(blogId)

  if (!blog){
    return notFound()
  }
  return (
    <MdxEditor blogContent={blog?.content ? blog.content : ""} blogCode={blog.code}/>
  )
}
