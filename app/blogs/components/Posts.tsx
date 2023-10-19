import { getSortedPostsData } from "@/libs/posts"
import ListItem from "./ListItem"
interface Props {
  readFolderUnderRoot:string,
  fileType:string,
  dir:string|null
}

export default function Posts({readFolderUnderRoot, fileType, dir}: Props) {
  const blogs:Blog[] = getSortedPostsData(readFolderUnderRoot, fileType, dir)
  return (
    <section className="mt-16 mx-auto max-w-4xl">
      <h2 className="mb-8 text-4xl font-bold dark:text-white/90">
        Blog
      </h2>
      <ul className="w-full">
        {blogs.map(blog=> <ListItem blog={blog} key={blog.id}/>)}
      </ul>
    </section>
  )
}