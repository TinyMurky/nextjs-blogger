import Posts from "../components/Posts"
import { getSortedPostsData } from "@/libs/posts";
import { allBlogs, Blog } from "@/libs/contentLayerAdapter";
type Props = {}

export default function page({}: Props) {

  const blogs = getSortedPostsData('/public/blogs/tech', 'md');
  return (
    <main>
      <Posts title="技術Blogs" blogs={blogs} />
    </main>
  )
}