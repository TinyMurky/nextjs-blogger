import Posts from "./blogs/components/Posts"
import path from "path"
import { allBlogs } from "@/libs/contentLayerAdapter"
type Props = {}

export default function page({}: Props) {
  const cwd = path.join(process.cwd(), '.next/server/app')
  const pathName = __dirname.substring(cwd.length)
  const blogs = allBlogs.filter(blog => {
    return blog.url.startsWith(pathName)
  })
  return (
    <main>
      <Posts title="心得Blogs" blogs={blogs} />
    </main>
  )
}