import { getBlogs } from "@/libs/getBlogs"
import Posts from "./blogs/components/Posts"
import path from "path"
type Props = {}

export const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 86400

export default async function page({}: Props) {
  const blogs = await getBlogs()
  const publishedBlogs = blogs.filter(blog => blog.published)

  return (
    <main>
      <Posts title="Blogs" category={null} blogs={publishedBlogs} />
    </main>
  )
}