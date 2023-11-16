'use client'
import React, {useState} from 'react'
import { isCategory } from '@/libs/db'
import { Category } from '@prisma/client'
import Link from 'next/link'
import PublishDropdown from './PublishDropdown'
type Props = {
  categoryId: string,
  blogId: string
}

const auth = () => ({ id: "1", email: "murky0830@gmail.com" })


export default function EditAndPublishBtn({ categoryId, blogId }: Props) {
  // edit未登入只有playground可以用
  // edit登入後所有地方都可以用
  // publish只有 edit頁面可以用而且還要登入
  const user = auth()

  if (!isCategory(categoryId)) return null

  const allowedNonLoginEditCategory: Category[] = [ Category.playground ]
  const allowedPublishCategory: Category[] = [ Category.edit ]



  if (user){

    const editLink = <Link href={`/edit/${blogId}`} prefetch={true} className='px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>
    const publishLink = allowedPublishCategory.includes(categoryId)
    ?
    <PublishDropdown blogId={blogId}/>
    : null

    return (
      <div className='flex flex-row items-center justify-center gap-4'>
        {editLink}
        {publishLink}
      </div>
    )
  } else {

    const editLink = allowedNonLoginEditCategory.includes(categoryId)
    ?
    <Link href={`/edit/${blogId}`} prefetch={true} className='px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>
    : null

    return (
      <div>
        {editLink}
      </div>
    )
  }
}