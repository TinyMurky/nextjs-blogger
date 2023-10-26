import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Blog = defineDocumentType(() => ({
  name: 'Insight',
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
})
