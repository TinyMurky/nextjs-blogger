import {bundleMDX} from 'mdx-bundler'
import remarkGfm from 'remark-gfm' // for table
import rehypeReact from 'rehype-react' // for table
import rehypePlugins from "./rehype-plugin.config"
import { BundleResult } from '@/type'

export async function mdx2Code( source: string, useRyhypePlugins: boolean = true): Promise<BundleResult>{
  const result = await bundleMDX({
    source: source,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
      options.rehypePlugins = useRyhypePlugins
        ?
        [...(options.rehypePlugins ?? []), ...rehypePlugins, rehypeReact]
        :
        [...(options.rehypePlugins ?? []), rehypePlugins[rehypePlugins.length - 1], rehypeReact]
      return options
    }
  })
  return result
}