import Posts from "./components/Posts"
import { getSortedPostsData } from "@/libs/posts";
type Props = {
}

export default function page({ }: Props) {
  const blogs = getSortedPostsData('/public/blogs', 'md');
  return (
    <main>
      <Posts blogs={blogs} />
    </main>
  )
}