import { allBlogs, Blog } from 'contentlayer/generated';
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import { compareDesc } from 'date-fns'

export { allBlogs, defineDocumentType, defineNestedType, makeSource }
    export type { Blog }

export const allPostsNewToOld =
  allBlogs?.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  }) || []
