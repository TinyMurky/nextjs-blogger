import { getBlogs } from "@/libs/getBlogs"
import Posts from "./blogs/components/Posts"
import path from "path"
type Props = {}

export default async function page({}: Props) {
  const cwd = path.join(process.cwd(), '.next/server/app')
  const pathName = __dirname.substring(cwd.length)
  const blogs = await getBlogs()
  return (
    <main>
      <Posts title="Blogs" blogs={blogs} />
    </main>
  )
}