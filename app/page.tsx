import Posts from "./blogs/components/Posts"
import path from "path"
import { allBlogs, Blog } from "@/libs/contentLayerAdapter"
// import { allBlogs } from 'contentlayer/generated'
type Props = {}

export default function page({}: Props) {
  const cwd = path.join(process.cwd(), '.next/server/app')
  const pathName = __dirname.substring(cwd.length)
  const blogs = allBlogs.filter((blog: Blog) => {
    return blog.url.startsWith(pathName)
  })
  return (
    <main>
      <Posts title="Blogs" blogs={blogs} />
    </main>
  )
}