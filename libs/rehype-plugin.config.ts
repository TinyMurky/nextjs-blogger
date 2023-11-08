import imageMetadata from './imageMetadata'
import rehypeSlug from 'rehype-slug'
import rehypePrism from "rehype-prism-plus"
import { Pluggable } from 'unified'
const rehypePlugins:Pluggable<any>[] = [
    imageMetadata,
    rehypeSlug, // add id to title
    [rehypePrism, { ignoreMissing: true }]
  ]
export default rehypePlugins