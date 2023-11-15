'use server'
import { BundleResult } from '@/type'
import { mdx2Code } from '@/libs/mdx2Code'
export async function mdx2CodeAction( source: string ): Promise<BundleResult>{

  const result = await mdx2Code(source, false)

  return result
}