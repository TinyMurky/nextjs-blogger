import { defineDocumentType } from 'contentlayer/source-files'
import { makeSource } from 'contentlayer/source-remote-files'
import { promises as fs } from 'fs'
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()


import path from 'path'
import imageMetadata from './libs/imageMetadata';
import rehypeSlug from 'rehype-slug'
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

const syncContentFromApi = async (contentDir: string) => {
  // 邏輯要包在syncRun
  const syncRun = async () => {
    // 正常情況用fetch
    //但是在build的時候因為url問題會fetch不成功，直接進資料庫拿資料
    let blogs
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
        method:'GET',
        headers: {}
      })

      // 請使用fetch時都要await json
      if (!res.ok){
        throw new Error ("res fetch fail!!")
      } 

      blogs = await res.json()
    } catch (error) {
      // 失敗的話直接從資料庫取資料
      blogs = await prisma.blog.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        select: { // 回傳欄位
          category: true,
          content: true,
          name: true
        }
      })
    } finally {

    if (!blogs || blogs.length) {
      return
    }

    await fs.mkdir(contentDir ,{ recursive: true }) // 確保content存放位置存在

    for (const blog of blogs) {
      const fileDir = path.join(contentDir, blog.category)
      await fs.mkdir(fileDir ,{ recursive: true }) 
      const filePath = path.join(fileDir, `${blog.name}.mdx`)

      // 以後可以用資料庫的值來改寫，目前先把文章直接存進去
      // const mdxContent = `---
      //     id: ${blog.id}
      //     authorId: ${blog.authorId}
      //     published: ${blog.published}
      //     category: ${blog.category}
      //     ---
      //     ${blog.content}
      //     `
      await fs.writeFile(filePath, blog.content, {encoding:"utf8"})
    }

    }
  }

  // 以下是cancel function的特殊寫法
  let wasCancelled = false
  let syncInterval:ReturnType<typeof setTimeout>

  const syncLoop = async () => {
    console.log('Syncing content files')

    await syncRun()

    if (wasCancelled) return

    syncInterval = setTimeout(syncLoop, 1000 * 60)
  }

  // Block until the first sync is done
  await syncLoop()

  return () => {
    wasCancelled = true
    clearTimeout(syncInterval)
  }
}

export default makeSource({
  syncFiles: syncContentFromApi,
  // syncFiles: (contentDir) => syncContentFromApi(contentDir),
  contentDirPath: './content/blogs',
  contentDirInclude: ['insight', 'tech'],
  documentTypes: [Blog],
  mdx: { rehypePlugins: [
    imageMetadata,
    rehypeSlug, // add id to title
    [rehypePrism, { ignoreMissing: true }]
  ]},
})

