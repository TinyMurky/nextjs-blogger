import JSZip from 'jszip'
import prisma from './db'
// 下載md檔
export default async function downloadMdx (blogId: string): Promise<Buffer> {
  const mdData = await prisma.blog.findUnique({
    where: {
      name: blogId
    },
    select: {
      content: true
    }
  })

  if(!mdData?.content) {
    throw new Error(`Mdx file of ${blogId} dose not exist`)
  }

  const zip = new JSZip()
  const mdx = await downloadImage(mdData.content, zip)
  zip.file(`${blogId}.md`, mdx)
  const zipContent = await zip.generateAsync({ type: 'nodebuffer' })
  return zipContent
}

// MDX文件圖片相對路徑
// 圖片符合https://utfs.io/f/ 開頭的會被下載
async function downloadImage(mdx:string, zip: JSZip): Promise<string>{

  const imageRegex = /https:\/\/utfs\.io\/f\/[^\s)'"]+/g //[^\s)'"]+匹配一個或多個不是空白字符、單引號 '、右括號 ) 或雙引號 " 的字符
  const matches = mdx.matchAll(imageRegex)
  
  for (const match of matches) {
    const url = match[0] //0是整個路徑
    const { imgFileName, imgArrayBuffer } = await fetchImage(url)

    // 抓不到就跳過
    if(!imgFileName || !imgArrayBuffer) {
      continue
    }

    zip.file(`images/${imgFileName}`, imgArrayBuffer)
    const fullPath = `./images/${imgFileName}`
    mdx = mdx.replace(url, fullPath)
  }
  
  return mdx
}

async function fetchImage(url: string): Promise<{imgFileName: string | null, imgArrayBuffer: ArrayBuffer | null}> {
  try {
    const urlArray = url.split('/')
    const imgFileName = urlArray[urlArray.length - 1]

    const response = await fetch(url)
    const imgArrayBuffer = await response.arrayBuffer()
    return {
      imgFileName,
      imgArrayBuffer
    }

  } catch(error) {
    console.log('Error in downloadMd.ts, downloadImage', error)
    return {
      imgFileName: null,
      imgArrayBuffer: null
    }
  }

}