'use client'

import React, { createElement } from 'react'
import Swal from 'sweetalert2';

type Props = {
  blogId: string
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
})

export default function DownloadMdxBtn({ blogId }: Props) {

  async function handleDownloadMdxOnclick() {
    const res= await fetch(`/api/blogs/${blogId}/download`, {
      method: 'GET'
    })
    if (!res.ok) {
      
      Swal.fire({
        title: `Download failed: ${res.status} ${res.statusText}`,
        icon: 'error',
        confirmButtonText: 'So Sadge :('
      })
      return
    }

    try{

      Toast.fire({
        icon: "success",
        title: "Download started"
      })
      const zipBlob = await res.blob()

      // 創造一個<a>裡面放zip的連結，點擊之後再刪除
      const downloadUrl = window.URL.createObjectURL(zipBlob)
      const a = document.createElement('a') // 創a
      a.href = downloadUrl
      a.download = `${blogId}.zip` // 指定檔名
      document.body.appendChild(a) // 加到body裡，才可以點擊
      a.click()


      // 刪掉a和url
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch(error) {
      console.log(error)
      Swal.fire({
        title: `Download failed: check F12 for more info`,
        icon: 'error',
        confirmButtonText: 'So Sadge :('
      })
    }
  }
  return (
    <button  onClick={handleDownloadMdxOnclick} className='px-6 py-1 rounded-xl bg-slate-700 hover:bg-slate-500 focus:shadow-xl no-underline'>download</button>
  )
}