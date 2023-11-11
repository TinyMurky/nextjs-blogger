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
      <main className={`flex flex-col gap-2`}>
        <div className='flex max-h-[92vh] w-full gap-24'>
          <div className="flex-1  overflow-auto">
            <Editor initialDoc={doc} onChange={handleDocChange} uploadImgUrl={uploadImgUrl}/>
          </div>
          <div className="flex-1 w-full overflow-auto">
            <Preview doc={doc} blogCode={ code } blogMatter={blogMatter} />
          </div>
        </div>
      </main>
      <ControlPannel setUploadImgUrl={setUploadImgUrl} saveBlogOnClicked={saveBlogOnClicked} blogCategory={blog.category} blogName={blog.name} doc={doc} />
    </div>
  )
}
