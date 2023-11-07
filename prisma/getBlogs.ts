import path from "path"
import fs from "fs"
import { Category } from "@prisma/client"

type blogData = {
  category: Category,
  published: boolean,
  content: string,
}

function isCategory(value: string | null): value is Category {
  console.log(value)
  if (!value){
    return false
  }
  // enum 才可以這樣寫
  return Object.values(Category).includes(value as Category)
}

export function getBlogsData(folderName:string, extension:string="mdx",  dir:string|null=null, category:string|null=null):blogData[] {
  // 把fileName整理成Blogblog type，不含文章內容
  // id是檔案名稱但不包含副檔名

  // 預設要刪掉哪種副檔名
  const regex = new RegExp(`\\.${extension}$`) 

  const blogFolder:string = dir
    ? path.join(dir, folderName) // 或著從給定dir下拿folder
    : path.join(process.cwd(), folderName) // 從root往下拿folder

  const contentDirents:fs.Dirent[] = fs.readdirSync(blogFolder, { withFileTypes: true })


  // 回傳所有副檔名與extension相同的檔案
  const fileDirents:fs.Dirent[] = contentDirents.filter(contentDirent => {
    return path.extname(contentDirent.name).toLowerCase() === `.${extension}`
  })

  // 回傳所有folder
  const folderDirents:fs.Dirent[] = contentDirents.filter(dirent => dirent.isDirectory())

  let allblogsData:blogData[] = fileDirents.map(fileDirent => {
    const fullPath:string = path.join(blogFolder, fileDirent.name)
    const fileContent:string = fs.readFileSync(fullPath, { encoding: 'utf8', flag: 'r' })

    return {
      published:true,
      content:fileContent,
      category: isCategory(category) ? category : "edit"
    }
  })

  // recursive
  folderDirents.forEach(folderDirent => {
    let foldeblogsData:blogData[]
    if (!category) { //是第一層
      foldeblogsData = getBlogsData(folderDirent.name, extension, blogFolder, folderDirent.name)
    } else { // blogs以外的層
      foldeblogsData = getBlogsData(folderDirent.name, extension, blogFolder, category)
    }
    allblogsData = allblogsData.concat(foldeblogsData)
  })


  return allblogsData
}

