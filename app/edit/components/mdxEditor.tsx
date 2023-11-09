"use client"
import Head from 'next/head'
import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import Editor from './editor'
import { Category } from '@prisma/client'
// import Footer from '../components/footer'
import Preview from './preview'
// import styles from '../styles/Home.module.css'


type Props = {
    blogContent: string

}


export default function MdxEditor( { blogContent }: Props) {
  const [doc, setDoc] = useState<string>("")


  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    // <div className={styles.container}>
    <div className="">
      <main className={` min-h-screen flex flex-col gap-2`}>
        <div className='flex flex-1 w-full gap-4'>
          <Editor initialDoc={doc} onChange={handleDocChange} />
          <Preview doc={doc} />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
