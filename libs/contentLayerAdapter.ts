import { allBlogs, Blog } from 'contentlayer/generated'

import { compareDesc } from 'date-fns'

export { allBlogs }

export type { Blog }

export const allPostsNewToOld =
  allBlogs?.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  }) || []
