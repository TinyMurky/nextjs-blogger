import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import transformImgSrc from './libs/transform-img-src'
// syntex hightlight

import rehypePrism from "rehype-prism-plus";
const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The doescription of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    tag: {
      type: 'string',
      description: 'The tag of the post',
      required: true,
    },
    readTime: {
      type: 'number',
      description: 'The readTime of the post',
      required: true,
    },
    cover: {
      type: 'string',
      description: 'The cover of the post',
      required: true,
    },
    slug: {
      type: 'string',
      description: 'The cover of the post',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'public/blogs',
  contentDirInclude: ['insight', 'tech'],
  documentTypes: [Blog],
  mdx: { rehypePlugins: [transformImgSrc, [rehypePrism, { ignoreMissing: true }]] },
})
