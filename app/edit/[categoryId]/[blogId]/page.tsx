import { Category } from "@prisma/client"
import { notFound } from "next/navigation"
import MdxEditor from "../../components/MdxEditor"
import { buildStaticBlogs, getBlogByName, getBlogs } from "@/libs/getBlogs"
type Props = {
  params: {
    categoryId: string,
    blogId: string
  }
}

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 86400

export async function generateStaticParams() {
  const blogs = await getBlogs()
  const blogIds = blogs.map( blog => blog.name)
  return blogIds
}


export default async function Edit( { params: { blogId } }: Props) {
  const blog = await getBlogByName(blogId)

  if (!blog){
    return notFound()
  }
  return (
    <MdxEditor blog={blog}/>
  )
}
