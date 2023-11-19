'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import Link from 'next/link'

import { isCategory } from '@/libs/db'
import PublishDropdown from './PublishDropdown'
import { allowedNonLoginUsePanelCategory, allowedNonLoginEditCategory, allowedNonLoginDeleteCategory, allowedPublishCategory } from '@/libs/allowList'

import DownloadMdxBtn from './DownloadMdxBtn'

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

  if (!session && !allowedNonLoginUsePanelCategory.includes(categoryId)) {
    return (
      <div className='flex flex-row items-center justify-center gap-4'>
        <DownloadMdxBtn blogId={blogId} />
      </div>
    )
  }

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

    const editLink = <Link href={`/edit/${categoryId}/${blogId}`} prefetch={true} className='text-gray-200/80 text-sm md:text-base px-2 md:px-4 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>

    const deleteBtn = <button  onClick={handleDeleteOnclick} className=' text-sm md:text-base px-2  md:px-4 py-1 rounded-xl bg-red-700 hover:bg-red-500 focus:shadow-xl no-underline'>Delete</button>

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
    <Link href={`/edit/${categoryId}/${blogId}`} prefetch={true} className='text-gray-200/90 text-sm md:text-base px-2 md:px-4 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>Edit</Link>
    : null

    const deleteBtn = allowedNonLoginDeleteCategory.includes(categoryId)
    ?
    <button  onClick={handleDeleteOnclick} className='text-sm md:text-base px-2 md:px-4 py-1 rounded-xl  bg-red-700 hover:bg-red-500 focus:shadow-xl no-underline'>Edit</button>
    : null

    output = (
      <>
        {editLink}
        {deleteBtn}
      </>
    )
  }


  return (
    <div className='flex flex-col md:flex-row items-start md:items-center justify-center gap-2 md:gap-4'>
      <DownloadMdxBtn blogId={blogId} />
      {output}
    </div>
  )
}