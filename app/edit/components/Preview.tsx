"use client"
import type React from 'react'
import { mdx2CodeAction } from '@/app/actions/mdx2CodeAction'
import { useState, useMemo, useEffect, useCallback } from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import mdxComponents from "@/libs/mdxComponents"
import { BundleResult } from '@/type'
import { Blog } from '@prisma/client'
import { debounce } from './editor-helpers'

import  DOMPurify from 'dompurify' // 防止xss

type ExcludeCodeAndContent = Pick<Blog, Exclude<keyof Blog, 'content' | 'code'>>

type blogMatter = ExcludeCodeAndContent
type Props = {
  doc: string,
  blogCode: string,
  blogMatter: blogMatter
}

export default function Preview({ doc, blogCode, blogMatter }: Props) {
  const [mdxCode, setMdxCode] = useState<string>(blogCode)
  const [mdxMatter, setMdxMatter] = useState<blogMatter>(blogMatter)

  // fetchMDX要先金過debounce才可以傳入useEffect
  const fetchMDX= useCallback(async (doc: string) => {
      const cleanDoc = DOMPurify.sanitize(doc, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) // 清理xss
      const {code, frontmatter}: Omit<BundleResult, "matter"> = await mdx2CodeAction(cleanDoc)
      setMdxCode(code)
      setMdxMatter(m => ({
        ...m,
        title: frontmatter.title
      }))
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchMDX = useCallback(debounce(fetchMDX, 1000), [fetchMDX])

  useEffect(() => {
    debouncedFetchMDX(doc)
  }, [doc, debouncedFetchMDX])
  // console.log('preview L32', mdxCode)

  const MDXContent = useMemo(() => getMDXComponent(mdxCode), [mdxCode])

  return (
    <div className='w-full preview markdown-body'>
      <main className='prose md:prose-xl prose-base prose-gray prose-invert mx-auto pt-8'>
        <h2 className="text-lg mt-4 mb-0">{mdxMatter.title}</h2>
        <article>
          <MDXContent components={mdxComponents}/>
        </article>
      </main>
    </div>
  )
}

