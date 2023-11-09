"use client"
import type React from 'react'
import { useState, useMemo, useEffect } from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import { defaultCode } from './defaultCode'
import mdxComponents from "@/libs/mdxComponents"
import { BundleResult } from '@/type'
import { mdx2Code } from "@/libs/mdx2Code"
type Props = {
  doc: string,
  blogInitCode: string
}

export default function Preview({ doc, blogInitCode }: Props) {

  const [mdxCode, setMdxCode] = useState<string>(blogInitCode)
  useEffect(() => {
    async function fetchMDX() {
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
    }
    fetchMDX()
  }, [doc])
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

