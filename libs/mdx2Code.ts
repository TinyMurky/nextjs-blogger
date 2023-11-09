import {bundleMDX} from 'mdx-bundler'

import rehypePlugins from "./rehype-plugin.config"
import { BundleResult } from '@/type'

export async function mdx2Code( source: string ): Promise<BundleResult>{

  const result = await bundleMDX({
    source: source,
    mdxOptions(options, frontmatter) {
      // options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), ...rehypePlugins]
      return options
    }
  })

  return result
}