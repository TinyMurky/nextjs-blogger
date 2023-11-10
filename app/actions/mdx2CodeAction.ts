'use server'
// import {bundleMDX} from 'mdx-bundler'

// import rehypePlugins from '@/libs/rehype-plugin.config'
import { BundleResult } from '@/type'
import { mdx2Code } from '@/libs/mdx2Code'
export async function mdx2CodeAction( source: string ): Promise<BundleResult>{

  const { code, frontmatter, errors } = await mdx2Code(source)

  return { code, frontmatter, errors }
}