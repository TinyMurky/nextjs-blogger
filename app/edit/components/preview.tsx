"use client"
import type React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import { defaultCode } from './defaultCode'
import mdxComponents from "@/libs/mdxComponents"
import { BundleResult } from '@/type'
type Props = {
  doc: string,
  blogInitCode: string
}

function debounce<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this
    const later = () => {
      timeoutId = null;
      func.apply(context, args)
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(later, wait)
  } as F
}



export default function Preview({ doc, blogInitCode }: Props) {

  const [mdxCode, setMdxCode] = useState<string>(blogInitCode)

  // fetchMDX要先金過debounce才可以傳入useEffect
  const fetchMDX= useCallback(async (doc: string) => {
    const res = await fetch('/api/mdx/preview', {
      method: 'POST',
      body: JSON.stringify(doc),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      const data: BundleResult = await res.json()
      if (data.code){
        setMdxCode(data.code)
      }
    }
  }, [])

  const debouncedFetchMDX = useCallback(debounce(fetchMDX, 2000), [fetchMDX])

  useEffect(() => {
    debouncedFetchMDX(doc)
  }, [doc, debouncedFetchMDX])
  // console.log('preview L32', mdxCode)

  const MDXContent = useMemo(() => getMDXComponent(mdxCode), [mdxCode])

  return (
    <div className='w-1/2 preview markdown-body'>
      <main className='prose md:prose-xl prose-base prose-gray prose-invert mx-auto'>
        <MDXContent components={mdxComponents}/>
      </main>
    </div>
  )
}

