import path from "path"
import fs from "fs"
import { Category } from "@prisma/client"
import processMdx from "./uploadImg"
import { mdx2Code } from "../../libs/mdx2Code"
type blogData = {
  name: string,
  published: boolean,
  category: Category,
  description: string | null,
  content: string | null,
  code: string,
  tag: string | null,
  readTime: number | null,
  cover: string | null,
  slug: string | null,
  date: Date | null
}

function isCategory(value: string | null): value is Category {
  if (!value){
    return false
  }
  // enum 才可以這樣寫
  return Object.values(Category).includes(value as Category)
}

export async function getBlogsData(folderName:string, extension:string="mdx",  dir:string|null=null, category:string|null=null):Promise<blogData[]> {
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

  let allblogsData:blogData[] = await Promise.all(fileDirents.map(async (fileDirent) => {
    const fullPath:string = path.join(blogFolder, fileDirent.name)
    // 文章丟進processMdx裡將圖片上傳uploadthings後回傳儲存到mdxFile
    const fileContent:string = await processMdx(fullPath)
    const {code, frontmatter} = await mdx2Code(fileContent)

    return {
      name: path.parse(fileDirent.name).name,
      published:true,
      category: isCategory(category) ? category : "edit",
      description: frontmatter.description,
      content:fileContent,
      code: code,
      tag: frontmatter.tag,
      readTime: frontmatter.readTime,
      cover: frontmatter.cover,
      slug: frontmatter.slug,
      date: new Date(frontmatter.date)
    }
  }))

  // recursive
  for (const folderDirent of folderDirents ){
    let foldeblogsData:blogData[]
    if (!category) { //是第一層
      foldeblogsData = await getBlogsData(folderDirent.name, extension, blogFolder, folderDirent.name)
    } else { // blogs以外的層
      foldeblogsData = await getBlogsData(folderDirent.name, extension, blogFolder, category)
    }
    allblogsData = allblogsData.concat(foldeblogsData)
  }


  return allblogsData
}

