'use server'
import { BundleResult } from '@/type'
import { mdx2Code } from '@/libs/mdx2Code'
export async function mdx2CodeAction( source: string ): Promise<Omit<BundleResult, "matter">>{

  const {code, frontmatter, errors} = await mdx2Code(source, false)

  return {code, frontmatter, errors}
}