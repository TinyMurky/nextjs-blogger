'use client'

import { useState, useMemo} from "react"
import ListItem from "./ListItem"
import SearchBar from "./SearchBar"

import { Blog } from "@/libs/contentLayerAdapter"
interface Props {
  title: string,
  blogs: Blog[]
}
export default function Posts({ title ,blogs }: Props) {

  const [search, setSearch] = useState('')

  const searchRegex = useMemo(() => new RegExp(search, 'i'), [search]) // 'i' 代表不區分大小寫

  const searchedBlogs: Blog[] = useMemo(() => {
    // 找到title裡有包含相關字元的文章
    return search ? blogs.filter(blog => searchRegex.test(blog.title)) : blogs;
  }, [blogs, search, searchRegex])

  return (
    <section className="mt-16 mx-auto lg:max-w-4xl sm:max-w-md max-w-xs px-8">
      <div className="mb-8 w-full flex flex-row items-center justify-between">
        <h2 className=" text-xl lg:text-4xl font-bold text-white/90">
          {title}
        </h2>
        <SearchBar search={search} setSearch={setSearch}  />
      </div>
      <ul className="w-full">
        {searchedBlogs.map(blog=> <ListItem blog={blog} key={blog._id}/>)}
      </ul>
    </section>
  )
}