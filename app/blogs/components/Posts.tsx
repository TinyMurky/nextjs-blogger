'use client'

import { useState, useMemo} from "react"
import ListItem from "./ListItem"
import SearchBar from "./SearchBar"
import NewBlogModal from "./NewBlogModal"
import { Category } from "@prisma/client"

import { Blog } from "@prisma/client"

interface Props {
  title: string,
  category: Category,
  blogs: Blog[]
}

const allowedNewPostCategory: Category[] = [ Category.edit, Category.playground ]

export default function Posts({ title, category, blogs }: Props) {

  const [search, setSearch] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const searchRegex = useMemo(() => new RegExp(search, 'i'), [search]) // 'i' 代表不區分大小寫

  const searchedBlogs: Blog[] = useMemo(() => {
    // 找到title裡有包含相關字元的文章
    return search ? blogs.filter(blog => {
      return searchRegex.test(blog.title) || ( blog.tag && searchRegex.test(blog.tag))
    }) : blogs
  }, [blogs, search, searchRegex])


  const newPostButton =  allowedNewPostCategory.includes(category) ?
    <button className="text-xl rounded-xl text-gray-200 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 px-4 pt-1 pb-2 font-bold" onClick={() => setShowModal(true)}>New Blog</button>
    : null

  return (
    <>
      <section className="mt-16 mx-auto lg:max-w-4xl sm:max-w-md max-w-sm px-4 lg:px-8">
        <div className="mb-8 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-4">
            <h2 className=" text-xl lg:text-4xl font-bold text-white/90">
              {title}
            </h2>
            {newPostButton}
          </div>
          <SearchBar search={search} setSearch={setSearch}  />
        </div>
        <ul className="w-full">
          {searchedBlogs.map(blog=> <ListItem blog={blog} key={blog.name}/>)}
        </ul>
      </section>
      <NewBlogModal showModal={showModal} setShowModal={setShowModal} allowedNewPostCategory={allowedNewPostCategory} category={category}/>
    </>
  )
}