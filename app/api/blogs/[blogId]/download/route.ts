import downloadMdx from "@/libs/downloadMd"
import { NextRequest, NextResponse } from "next/server"
type Props = {
  params: {
    blogId: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  // 此api會回傳mdx與裡面的圖片壓縮成一個zip
  // zip是用 buffer回傳，前端還要轉成blob才能下載
  try{
    const { blogId } = params
    const zipBuffer = await downloadMdx(blogId)

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=archive.zip'
      }
    })
  } catch(error) {
      console.log(error)
      return NextResponse.json({ message: error }, {
        status: 500,
        statusText: 'Internal Sever Error',
    })
  }
}