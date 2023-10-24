import Posts from "../components/Posts"
import { getSortedPostsData } from "@/libs/posts";
type Props = {}

export default function page({}: Props) {

  const blogs = getSortedPostsData('/public/blogs/insight', 'md');
  return (
    <main>
      <Posts title="心得Blogs" blogs={blogs} />
    </main>
  )
}