"use client"
import { useState, useCallback } from 'react'
import Editor from './Editor'
import Preview from './Preview'
import ControlPannel from './ControlPannel'
import { Blog } from '@prisma/client'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

type Props = {
  blog: Blog
}

async function saveBlogOnClicked(blogName: string, doc: string, router:AppRouterInstance | null = null,redirectHref: string | null = null) {
  const res = await fetch(`/api/blogs/${blogName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doc)
  })

  if (!res.ok){
    window.alert('Blog saving has failed!aaaaa')
    return
  }

  const { message } = await res.json()
  window.alert(message)

  if (router && redirectHref) {
    router.prefetch(redirectHref)
    router.push(redirectHref)
  }
  return
}

export default function MdxEditor( { blog }: Props) {
  const { content, code, ...blogMatter } = blog
  const blogContent = content ? content : ""
  const [doc, setDoc] = useState<string>(blogContent)


  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    // <div className={styles.container}>
    <div className="">
      <main className={` min-h-screen flex flex-col gap-2`}>
        <div className='flex flex-1 w-full gap-4'>
          <Editor initialDoc={doc} onChange={handleDocChange} />
          <Preview doc={doc} blogCode={ code } blogMatter={blogMatter} />
        </div>
      </main>
      <ControlPannel saveBlogOnClicked={saveBlogOnClicked} blogCategory={blog.category} blogName={blog.name} doc={doc} />
    </div>
  )
}
