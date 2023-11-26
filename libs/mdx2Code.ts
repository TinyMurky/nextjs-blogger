import {bundleMDX} from 'mdx-bundler'
import remarkGfm from 'remark-gfm' // for table
import rehypeReact from 'rehype-react' // for table
import rehypePlugins from "./rehype-plugin.config"
import { BundleResult } from '@/type'

import { sanitize } from "isomorphic-dompurify"

export async function mdx2Code( source: string, useRyhypePlugins: boolean = true): Promise<BundleResult>{
  const cleanSource = removeXSSFromMDX(source) 
  const result = await bundleMDX({
    source: cleanSource,
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

// 需要防止code block以外的code備注入jsx
function removeXSSFromMDX(source: string): string {
  const { noCodeBlocksSource, codeBlocks } = extractCodeBlocks(source)
  const cleanSource = sanitize(noCodeBlocksSource,  { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) // 防止XSS

  // 每次match都會使用callback, callback從blocks shift一個出來填上
  const finalSource = cleanSource.replace(/CODE_BLOCK_PLACEHOLDER/g, (): string => {
    return codeBlocks.shift() || '' // 如果codeBlock空了pop出undefined就用空格
  })
  return finalSource
}

function extractCodeBlocks(source:string): {noCodeBlocksSource: string, codeBlocks: string[]} {
  const codeBlocks: string[] = []
  // 只有在code block裡的html會被保存
  const noCodeBlocksSource = source.replace(/(```[\s\S]*?```)|(`[\s\S]*?`)/g, (match) => {
    codeBlocks.push(match);
    return "CODE_BLOCK_PLACEHOLDER";
  })
  return { noCodeBlocksSource, codeBlocks };
}