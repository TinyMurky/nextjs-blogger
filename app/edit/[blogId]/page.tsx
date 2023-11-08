import { Category } from "@prisma/client"
import MdxEditor from "../components/mdxEditor"
type Props = {
  params: {
    blogId: string
  }
}

async function fetchBlogs()  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`)
 
  if (!res.ok) {
    return []
  }

  const blogs = await res.json()
  return blogs
}
export async function generateStaticParams() {

  const blogs = await fetchBlogs()
  const blogIds = await Promise.all(blogs.map((blog:{ category: Category, content: string, name: string }) => {
    return {
      blogId: blog.name
    }
  }))
  return blogIds
}



export default async function Edit( { params:{ blogId } }: Props) {
  const blogs = await fetchBlogs()
  return (
    <MdxEditor blogId={blogId}/>
  )
}
