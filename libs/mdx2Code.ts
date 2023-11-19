import {bundleMDX} from 'mdx-bundler'

import rehypePlugins from "./rehype-plugin.config"
import { BundleResult } from '@/type'

export async function mdx2Code( source: string, useRyhypePlugins: boolean = true): Promise<BundleResult>{
  const result = await bundleMDX({
    source: source,
    mdxOptions(options, frontmatter) {
      // options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
      options.rehypePlugins = useRyhypePlugins
        ?
        [...(options.rehypePlugins ?? []), ...rehypePlugins]
        :
        [...(options.rehypePlugins ?? []), rehypePlugins[rehypePlugins.length - 1]]
      return options
    }
  })
  return result
}