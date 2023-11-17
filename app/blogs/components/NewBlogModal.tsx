'use client'
import React, { useState, useEffect, useRef, FormEvent, Dispatch, SetStateAction } from 'react'
import { useRouter } from "next/navigation"
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa"
import clsx from 'clsx'
import { Category } from "@prisma/client"
import isBlogNameExisted from '@/app/actions/checkNameExist'
type Props = {
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
  category: Category | null,
  allowedNewPostCategory: Category[],
}

const blogNameRegex = /^[a-zA-Z0-9-_]{3,}$/

export default function NewBlogModal({ showModal, setShowModal, category, allowedNewPostCategory }: Props) {
  // 必填： name, title, author(用關聯的)

  // const userRef = useRef()
  const blogNameRef = useRef<HTMLInputElement>(null)
  const blogTitleRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLParagraphElement>(null)
  const router = useRouter()

  const [blogName, setBlogName] = useState('')
  const [validBlogName, setValidBlogName] = useState(false)
  const [blogNameFocus, setBlogNameFocus] = useState(false)

  const [blogTitle, setBlogTitle] = useState('')
  const [validBlogTitle, setValidBlogTitle] = useState(false)
  const [blogTitleFocus, setBlogTitleFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setBlogNameFocus(true)
  },[])

  useEffect(() => {
    const nameMatchRegex = blogNameRegex.test(blogName)
    setValidBlogName(nameMatchRegex)
  }, [blogName])

  useEffect(() => {
    const atLeastOneWord = blogTitle.length > 0
    setValidBlogTitle(atLeastOneWord)
  }, [blogTitle])

  // 如果用戶輸入新的值，就先把警示訊息清空
  useEffect(() => {
    setErrMsg('')
  }, [blogName, blogTitle])
  const handleSumit =async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //最終確認避免失效
    if (!blogNameRegex.test(blogName) || !(blogTitle.length > 0)){
      setErrMsg('Invalid Input')
      return
    }
    const isBlogNameUsed = await isBlogNameExisted(blogName)
    if (isBlogNameUsed) {
      setErrMsg('Blog name already been used!')
      return

    }
    const data = {
      name: blogName,
      title: blogTitle,
      category
    }
    const res = await fetch('/api/blogs', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) // json送出去
    })

    // fetch要await 等回來也要await
    // 後端也回傳json, 用json打開
    if (!res.ok) {
      setErrMsg(res.statusText)
      return
    }

    router.push(`/edit/${category}/${blogName}`)
  }

  // 只有edit和playground有新增
  if (!category || !allowedNewPostCategory.includes(category)){
    return null
  }

  return (
    <div className={clsx(
    "fixed top-0 left-0 w-full h-full flex items-center bg-opacity-0 justify-center z-10",
      {
        hidden: !showModal,
      })
    }>
      <div className='bg-gray-600 px-6 pt-2 pb-1 rounded-xl shadow-lg relative'>
        <button className='absolute top-2 right-2 m-0 p-2 rounded-xl text-gray-200 bg-gray-700 hover:bg-opacity-50'
         onClick={() => setShowModal(false)}>
          <FaTimes />
        </button>
        <form onSubmit={handleSumit} className="px-8 pb-6 pt-8">
            <p ref={errRef} className={
              clsx(
                "p-2 mb-4 text-red-400 bg-gray-700 rounded-lg flex justify-center items-center",
                {
                'visible': errMsg,
                'hidden': !errMsg
              })
            }>
              {errMsg}
            </p>
          <div className='flex flex-col items-start'>
            <label htmlFor="blogName" className='text-gray-200 flex flex-row gap-2 items-center mb-2'>
              Enter Blog Name:
              <span className={
                clsx('text-green-500 text-xl',
                {
                  'visible': validBlogName,
                  'hidden': !validBlogName
                })
              }>
                <FaCheck />
              </span>
              <span className={
                clsx('text-red-500 text-xl',
                  {
                  'visible': !(validBlogName || blogName),
                  'hidden': validBlogName || !blogName
                  })
              }>
                <FaTimes/>
              </span>
            </label>
            <input 
              className='bg-gray-800 bg-opacity-50 focus:bg-gray-700 outline-none caret-white/90 text-white/90 px-2 py-2 w-full  text-base rounded-xl'
              id="blogName"
              type="text"
              ref={blogNameRef}
              onChange={e => setBlogName(e.target.value)}
              onFocus={() => setBlogNameFocus(true)}
              onBlur={() => setBlogNameFocus(false)}
              required
            />
            <div
              id='uidnote'
              className={clsx('flex flex-row gap-2 items-center text-gray-200 w-full text-xs py-2 px-4 mx-0 my-2 bg-slate-700 bg-opacity-50 rounded-md',
                {
                'visible': blogNameFocus && blogName && !validBlogName,
                'hidden': !(blogNameFocus && blogName && !validBlogName)
                }
              )}
            >
              <FaInfoCircle/>
              <div>
                At least 3 words<br/>
                Letters, numbers, underscores, hyphens allowed.
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start mt-4'>
            <label htmlFor="blogTitle" className='text-gray-200 flex flex-row gap-2 items-center mb-2'>
              Enter Blog Title:
              <span className={
                clsx('text-green-500 text-xl',
                {
                  'visible': validBlogTitle,
                  'hidden': !validBlogTitle
                })
              }>
                <FaCheck />
              </span>
              <span className={
                clsx('text-red-500 text-xl',
                  {
                  'visible': !(validBlogTitle || blogTitle),
                  'hidden': validBlogTitle || !blogTitle
                  })
              }>
                <FaTimes/>
              </span>
            </label>
            <input 
              className='bg-gray-800 bg-opacity-50 focus:bg-gray-700 outline-none caret-white/90 text-white/90 px-2 py-2 w-full  text-base rounded-xl'
              id="blogTitle"
              type="text"
              ref={blogTitleRef}
              onChange={e => setBlogTitle(e.target.value)}
              onFocus={() => setBlogTitleFocus(true)}
              onBlur={() => setBlogTitleFocus(false)}
              required
            />
            <div
              id='uidnote'
              className={clsx('flex flex-row gap-2 items-center text-gray-200 w-full text-xs py-2 px-4 mx-0 my-2 bg-slate-700 bg-opacity-50 rounded-md',
                {
                'visible': blogTitleFocus  && !validBlogTitle,
                'hidden': !(blogTitleFocus && !validBlogTitle)
                }
              )}
            >
              <FaInfoCircle/>
              <div>
                At least 1 word.
              </div>
            </div>
          </div>
          <button className='text-gray-200 bg-gray-700 hover:bg-opacity-50 mt-8 px-4 py-2 rounded-xl' type='submit'>Create</button>
        </form>
      </div>
    </div>
  )
}