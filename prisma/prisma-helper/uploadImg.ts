import { UTApi } from "uploadthing/server"
import fs from 'fs'
import { Blob, File } from "buffer"
import path from "path"
import mime from 'mime-types'


// Edge / Node < 20 friendly File interface
interface FileEsque extends Blob { // 這個是官網給的type, 其實就是file type
  name: string
}
export default async function processMdx(mdxPath:string):Promise<string> {
  // 讀mdx擋在的path
  const mdxContent = fs.readFileSync(mdxPath, { encoding: 'utf8', flag: 'r' })
  const updatedContent = await replaceImagePaths(mdxContent, mdxPath)
  
  // write回文件或保存成新文件
  // 以下兩個預留以後要製造新mdx儲存時再用，現在先直接回傳
  // fs.writeFileSync(`${mdxPath}.new`, updatedContent, 'utf8')
  // 或者： fs.writeFileSync(mdxPath, updatedContent, 'utf8')
  return updatedContent
}

// MDX文件圖片相對路徑
const imageRegex = /(\.\/images\/[^'"\s)]+)/g
// 圖片相對路徑替換成絕對路徑，然後上傳updatethings之後
async function replaceImagePaths(mdxContent:string, mdxPath:string):Promise<string>{
  const matches = mdxContent.matchAll(imageRegex)
  
  for (const match of matches) {
    const localPath = match[1] //0是整個路徑
    const fullPath = path.join(path.dirname(mdxPath), localPath);
    let cloudUrl = await uploadFile(fullPath)

    // 替换本地路径成cloudURL
    // 沒有成功就跳過
    if (!cloudUrl){
      continue
    }
    mdxContent = mdxContent.replace(localPath, cloudUrl)
  }
  
  return mdxContent
}

export async function uploadFile(filePath: string): Promise<string|undefined>{
  // 一次上傳一筆
  // 這是uploadthings的apu
  const utapi = new UTApi()

  // file是File type 要 array [blob] + 名稱
  const files = getFileData(filePath)
  let response = await utapi.uploadFiles(files)

  return response.data?.url
}




function getFileData(filePath: string): FileEsque{
  const buffer = fs.readFileSync(filePath)
  const name = path.basename(filePath)
  const type = mime.contentType(name) || 'application/octet-stream' // 'application/octet-stream' 是未知值
  // blob => [buffer] + type
  const blob = new Blob([buffer], { type: type })
  // File [blob] + name
  const file = new File([blob], name)

  return file
}
