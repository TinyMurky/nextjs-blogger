'use client'

import { useState, useMemo} from "react"
import ListItem from "./ListItem"
import SearchBar from "./SearchBar"

interface Props {
  blogs: Blog[]
}
export default function Posts({ blogs }: Props) {

  const [search, setSearch] = useState('')

  const searchRegex = useMemo(() => new RegExp(search, 'i'), [search]) // 'i' 代表不區分大小寫

  const searchedBlogs: Blog[] = useMemo(() => {
    // 找到title裡有包含相關字元的文章
    return search ? blogs.filter(blog => searchRegex.test(blog.title)) : blogs;
  }, [blogs, search, searchRegex])

  return (
    <section className="mt-16 mx-auto lg:max-w-4xl max-w-xs">
      <div className="mb-8 w-full flex flex-row items-center justify-between">
        <h2 className=" text-xl lg:text-4xl font-bold dark:text-white/90">
          Blog
        </h2>
        <SearchBar search={search} setSearch={setSearch}  />
      </div>
      <ul className="w-full">
        {searchedBlogs.map(blog=> <ListItem blog={blog} key={blog.id}/>)}
      </ul>
    </section>
  )
}