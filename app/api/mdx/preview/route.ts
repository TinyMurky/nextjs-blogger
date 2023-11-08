import { NextRequest, NextResponse } from "next/server"
import {bundleMDX} from 'mdx-bundler'

import rehypePlugins from "@/libs/rehype-plugin.config"

export async function POST(request: NextRequest){
  const source = await request.json()
  const result = await bundleMDX({
    source: source,
    mdxOptions(options, frontmatter) {
      // options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), ...rehypePlugins]
      return options
    },
  })

  return NextResponse.json(result)
}