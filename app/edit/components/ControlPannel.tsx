'use client'
import type React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

type Props = {
  saveBlogOnClicked: (blogName: string, doc: string, router:AppRouterInstance | null, redirectHref: string | null) => void,
  blogName: string,
  blogCategory: string,
  doc:string
}
export default function ControlPannel({ saveBlogOnClicked ,blogCategory , blogName, doc}: Props) {
  const router = useRouter()
  const [showControlPanel, setShowControlPanel] = useState(false);

  const checkMousePosition = (e: MouseEvent) => {
    const { clientX, clientY } = e
    const thresholdY = 400 
    const thresholdX = 2000 
    const nearBottom = window.innerHeight - clientY < thresholdY;
    const nearLeft = clientX < thresholdX

    if (nearBottom && nearLeft) {
      setShowControlPanel(true)
    } else {
      setShowControlPanel(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', checkMousePosition)

    return () => {
      window.removeEventListener('mousemove', checkMousePosition)
    }
  }, [])

  return (
    <div className={`px-4 py-3 flex flex-row justify-around gap-4 items-center m-0 controlPannel fixed ${showControlPanel ? 'inline-flex opacity-100' : 'hidden opacity-0'} bottom-16  left-12 transition-all ease-in rounded bg-gray-600 bg-opacity-50 backdrop-blur-md`}>
      <button className='bg-slate-600 hover:bg-slate-500 text-gray-300 px-4 py-2 m-0 rounded-xl' onClick={() => saveBlogOnClicked(blogName, doc, null, null)}>Save</button>
      <button className='bg-slate-600 hover:bg-slate-500 text-gray-300 px-4 py-2 m-0 rounded-xl' onClick={() => saveBlogOnClicked(blogName, doc, router, `/blogs/${blogCategory}/${blogName}`)}>Finish</button>
    </div>
  )
}
