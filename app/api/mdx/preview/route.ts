import { NextRequest, NextResponse } from "next/server"
import { mdx2Code } from "@/libs/mdx2Code"
export async function POST(request: NextRequest){
  const source = await request.json()
  const result = await mdx2Code(source)

  return NextResponse.json(result)
}