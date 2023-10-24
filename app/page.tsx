import Posts from "./blogs/components/Posts"
import { getSortedPostsData } from "@/libs/posts";
type Props = {
}

export default function page({ }: Props) {
  const blogs = getSortedPostsData('/public/blogs', 'md');
  return (
    <main>
      <Posts title="Blogs" blogs={blogs} />
    </main>
  )
}