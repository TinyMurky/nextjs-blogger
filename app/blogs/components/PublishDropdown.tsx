'use client'
import React, {useState} from 'react'

import { useRouter } from 'next/navigation'
type Props = {
  blogId: string
}
export default function PublishDropdown({ blogId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router  = useRouter()
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handlePublishOnclick = async (blogId: string, category: string) => {
    const res = await fetch(`/api/blogs/${blogId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: true,
          category: category,
        })
    })

    if(!res.ok) {
      window.alert(`Publish failed : ${res.status} ${res.statusText}`)
      return
    }

      window.alert(`Publish successed!`)
    router.push(`/blogs/${category}/${blogId}`)
  } 

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline">
        Publish
      </button>

      {isOpen && (
        <div className="absolute mt-2 py-2 w-48 bg-gray-700 rounded shadow-xl">
          <button onClick={() => handlePublishOnclick(blogId, "insight")} className="block px-4 py-2 text-gray-200 hover:bg-gray-600 w-full text-left">
            心得文章
          </button>
          <button  onClick={() => handlePublishOnclick(blogId, "tech")} className="block px-4 py-2 text-gray-200 hover:bg-gray-600 w-full text-left">
            技術文章
          </button>
        </div>
      )}
    </div>
  )
}