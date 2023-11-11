"use client"
import { useState, useCallback } from 'react'
import Editor from './Editor'
import Preview from './Preview'
import ControlPannel from './ControlPannel'
import { Blog } from '@prisma/client'
import { saveBlogOnClicked } from './editor-helpers'

type Props = {
  blog: Blog
}


export default function MdxEditor( { blog }: Props) {
  const { content, code, ...blogMatter } = blog
  const blogContent = content ? content : ""
  const [doc, setDoc] = useState<string>(blogContent)
  const [uploadImgUrl, setUploadImgUrl] = useState<string>("")

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    // <div className={styles.container}>
    <div className="">
      <main className={` min-h-screen flex flex-col gap-2`}>
        <div className='flex flex-1 w-full gap-4'>
          <Editor initialDoc={doc} onChange={handleDocChange} uploadImgUrl={uploadImgUrl}/>
          <Preview doc={doc} blogCode={ code } blogMatter={blogMatter} />
        </div>
      </main>
      <ControlPannel setUploadImgUrl={setUploadImgUrl} saveBlogOnClicked={saveBlogOnClicked} blogCategory={blog.category} blogName={blog.name} doc={doc} />
    </div>
  )
}
