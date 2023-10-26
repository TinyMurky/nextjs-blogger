import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark"
// import remarkImages from 'remark-images'
import transformImgSrc from "./transform-img-src"
import remark2rehype from 'remark-rehype'
// import highlight from 'rehype-highlight'
import stringify from 'rehype-stringify'

import { replaceDotFolder } from "./removeRepeatUrl"

export function getSortedPostsData(
  folderName:string,
  extension:string="md",
  dir:string|null=null):Blog[] {
  // 把fileName整理成BlogPost type，不含文章內容
  // id是檔案名稱但不包含副檔名

  // 預設要刪掉哪種副檔名
  const regex = new RegExp(`\\.${extension}$`) 

  const postFolder:string = dir
    ? path.join(dir, folderName) // 或著從給定dir下拿folder
    : path.join(process.cwd(), folderName) // 從root往下拿folder

  const contentDirents:fs.Dirent[] = fs.readdirSync(postFolder, { withFileTypes: true })


  // 回傳所有副檔名與extension相同的檔案
  const fileDirents:fs.Dirent[] = contentDirents.filter(contentDirent => {
    return path.extname(contentDirent.name).toLowerCase() === `.${extension}`
  })

  // 回傳所有folder
  const folderDirents:fs.Dirent[] = contentDirents.filter(dirent => dirent.isDirectory())

  let allPostsData:Blog[] = fileDirents.map(fileDirent => {
    const id:string = fileDirent.name.replace(regex, '')
    const fullPath:string = path.join(postFolder, fileDirent.name)
    const fileContent:string = fs.readFileSync(fullPath, { encoding: 'utf8', flag: 'r' })
    const  matterResult: matter.GrayMatterFile<string> = matter(fileContent)
    const blog:Blog= {
      id,
      path: fullPath,
      category: `/${dir ? path.basename(dir) : ""}` ,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tag: matterResult.data.tag,
      readTime: matterResult.data.readTime,
      cover: replaceDotFolder(matterResult.data.cover, postFolder),
      description: matterResult.data.description
    }
    return blog
  })

  // recursive
  folderDirents.forEach(folderDirent => {
    const foldePostsData:Blog[] = getSortedPostsData(folderDirent.name, extension, postFolder)
    allPostsData = allPostsData.concat(foldePostsData)
  })

  // Sort posts by date 降逆
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}

export async function getPostData(blog:Blog):Promise<BlogWithContent> {
  const fileContent:string = fs.readFileSync(blog.path, { encoding: 'utf8', flag: 'r' })
  const fileFolder:string = path.dirname(blog.path)
  const  matterResult: matter.GrayMatterFile<string> = matter(fileContent)

  // markdown to html
  const processedContent= await remark()
    // .use(transformImgSrc(fileFolder))
    .use(remark2rehype, {allowDangerousHtml: true}) //啟用inframe
    // .use(highlight)
    .use(stringify, {allowDangerousHtml: true})
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    ...blog,
    contentHtml
  }
}