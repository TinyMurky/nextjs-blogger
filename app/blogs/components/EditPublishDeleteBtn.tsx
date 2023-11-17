'use client'
import React, {useState} from 'react'
import { isCategory } from '@/libs/db'
import { Category } from '@prisma/client'
import Link from 'next/link'
import PublishDropdown from './PublishDropdown'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { allowedNonLoginUsePanelCategory, allowedNonLoginEditCategory, allowedNonLoginDeleteCategory, allowedPublishCategory } from '@/libs/allowList'
import Swal from 'sweetalert2'
type Props = {
  categoryId: string,
  blogId: string
}

const auth = () => ({ id: "1", email: "murky0830@gmail.com" })


export default function EditPublishDeleteBtn({ categoryId, blogId }: Props) {
  // edit未登入只有playground可以用
  // edit登入後所有地方都可以用
  // publish只有 edit頁面可以用而且還要登入
  // 登入邏輯
  const user = auth()
  const router = useRouter()
  const { data: session } = useSession()

  if (!isCategory(categoryId)) return null

  if (!session && !allowedNonLoginUsePanelCategory.includes(categoryId)) return null

  const handleDeleteOnclick = async () => {
    const swalResult = await Swal.fire({
      title: `Do you want to delete ${blogId}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`
    })
    if (!swalResult.isConfirmed){
      Swal.fire("Delete Canceled", "", "info")
      return
    }
    const res = await fetch(`/api/blogs/${blogId}`, {
      method: 'DELETE',
      headers: {
        // 'X-Source-Page': `/blogs/${categoryId}/${blogId}` // 發送讓後端知道是誰發起請求
      }
    })

    if (!res.ok) {
      Swal.fire({
        title: `Delete failed: ${res.status} ${res.statusText}`,
        icon: 'error',
        confirmButtonText: 'So Sadge :('
      })
    }

    Swal.fire({
      title: 'Delete Successed',
      icon: 'success',
      confirmButtonText: "Let's Go"
    })
    router.push(`/blogs/${categoryId}`)
  }

  let output: React.JSX.Element
  if (user){

    const editLink = <Link href={`/edit/${categoryId}/${blogId}`} prefetch={true} className='text-gray-200/80 px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>

    const deleteBtn = <button  onClick={handleDeleteOnclick} className='px-6 py-1 rounded-xl bg-red-700 hover:bg-red-500 focus:shadow-xl no-underline'>Delete</button>

    const publishLink = allowedPublishCategory.includes(categoryId)
    ?
    <PublishDropdown blogId={blogId}/>
    : null

    output = (
      <>
        {editLink}
        {publishLink}
        {deleteBtn}
      </>
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

    output = (
      <>
        {editLink}
        {deleteBtn}
      </>
    )
  }


  return (
    <div className='flex flex-row items-center justify-center gap-4'>
      {output}
    </div>
  )
}