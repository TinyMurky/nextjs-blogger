'use client'
import React, {useState} from 'react'
import { isCategory } from '@/libs/db'
import { Category } from '@prisma/client'
import Link from 'next/link'
import PublishDropdown from './PublishDropdown'
import { useRouter } from 'next/navigation'
type Props = {
  categoryId: string,
  blogId: string
}

const auth = () => ({ id: "1", email: "murky0830@gmail.com" })


export default function EditPublishDeleteBtn({ categoryId, blogId }: Props) {
  // edit未登入只有playground可以用
  // edit登入後所有地方都可以用
  // publish只有 edit頁面可以用而且還要登入
  const user = auth()
  const router = useRouter()
  if (!isCategory(categoryId)) return null

  const allowedNonLoginEditCategory: Category[] = [ Category.playground ]
  const allowedNonLoginDeleteCategory: Category[] = [ Category.playground ]
  const allowedPublishCategory: Category[] = [ Category.edit ]

  const handleDeleteOnclick = async () => {
    const res = await fetch(`/api/blogs/${blogId}`, {
      method: 'DELETE',
      headers: {}
    })

    if (!res.ok) {
      window.alert(`Delete failed: ${res.status} ${res.statusText}`)
    }


    window.alert('Delete Successed')
    router.push(`/blogs/${categoryId}`)
  }

  if (user){

    const editLink = <Link href={`/edit/${categoryId}/${blogId}`} prefetch={true} className='text-gray-200/80 px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>

    const deleteBtn = <button  onClick={handleDeleteOnclick} className='px-6 py-1 rounded-xl bg-red-700 hover:bg-red-500 focus:shadow-xl no-underline'>Delete</button>

    const publishLink = allowedPublishCategory.includes(categoryId)
    ?
    <PublishDropdown blogId={blogId}/>
    : null

    return (
      <div className='flex flex-row items-center justify-center gap-4'>
        {editLink}
        {publishLink}
        {deleteBtn}
      </div>
    )
  } else {

    const editLink = allowedNonLoginEditCategory.includes(categoryId)
    ?
    <Link href={`/edit/${categoryId}/${blogId}`} prefetch={true} className='text-gray-200/90 px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>
    : null

    const deleteBtn = allowedNonLoginDeleteCategory.includes(categoryId)
    ?
    <button  onClick={handleDeleteOnclick} className='px-6 py-1 rounded-xl  bg-red-700 hover:bg-red-500 focus:shadow-xl no-underline'>Edit</button>
    : null

    return (
      <div className='flex flex-row items-center justify-center gap-4'>
        {editLink}
        {deleteBtn}
      </div>
    )
  }
}