import { NextRequest, NextResponse } from "next/server"
import { format } from 'date-fns'
import prisma, { isCategory } from "@/libs/db"
import { mdx2Code } from "@/libs/mdx2Code"
import { revalidatePath } from "next/cache"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/libs/authOptions"

const PLAYGROUND_AUTHOR_ID = -1
// new blog
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const allowedOrigin = request.headers.get("origin")
  const { name, title, category }: {name: string, title: string, category: string, userId:number} = await request.json()

  if (!name || !title || !category) {
    return new NextResponse(JSON.stringify({message: "Invalid name or title or category"}), {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  const isPlayground = category === 'playground'

  const mdx = defaultMdx(title)
  const { code, frontmatter } = await mdx2Code(mdx)
  const newBlog = await prisma.blog.create({
    data: {
      name: name,
      authorId: isPlayground ?  PLAYGROUND_AUTHOR_ID : session?.user?.id ? session.user.id :  PLAYGROUND_AUTHOR_ID, // 沒有session就只能刪playground的
      title: frontmatter.title,
      published: false,
      category: isCategory(category) ? category : "edit",
      content: mdx,
      code: code,
      createdAt:new Date(frontmatter.date)
    }
  })

  if (!newBlog) {
    return new NextResponse(JSON.stringify({message: "Create blog failed"}), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
  revalidatePath(`/blogs/${category}/${name}`, 'page')
  revalidatePath(`/edit/${name}`, 'page')
  return new NextResponse(JSON.stringify({message: "Create blog successed"}), {
      status: 200,
      statusText: 'ok',
      headers: {
        'Content-Type': 'application/json',
      }
    })
}

function defaultMdx(title: string): string {
  const date:string = format(new Date(), 'yyyy-MM-dd')
  const demoImgUrl = process.env.DEFAULT_NEWBLOG_IMG
  const mdx = `---
title: ${title}
description: 
date: ${date}
tag: editing
readTime: 5
cover: ${demoImgUrl ? demoImgUrl : ""}
slug: 
---

請於此開始撰寫文章

mdx上方的欄位請務必於冒號後增加空格再更改內容，此外請不要打太短的內容，會影響畫面顯示

上傳圖片請使用左下角的 "Add Image"

mdx 上方的 "cover"是封面圖， 請使用add image上傳後，保留url的部份 刪除 驚嘆號、中括號與小括號

# Markdown 語法介紹

## 標題

在 Markdown 中，你可以通過在文字前面加上 \`#\` 來創建標題。標題的級別由 \`#\` 的數量決定（1-6級）。

# 一級標題
## 二級標題
### 三級標題
#### 四級標題
##### 五級標題
###### 六級標題

## 段落與換行

普通的文字直接書寫即為段落。段落間留一行空白即可。

若要換行，在行末加上兩個或以上的空格然後回車。

## 強調

你可以使用 \`*\` 或 \`_\` 來強調文字。

*斜體* 或 _斜體_
**粗體** 或 __粗體__
***粗斜體*** 或 ___粗斜體___

## 列表

無序列表使用星號、加號或減號作為列表項的標記：

- 項目一
- 項目二
- 項目三

有序列表則使用數字後跟一個點：

1. 第一項
2. 第二項
3. 第三項

## 連結

創建連結的語法是將連結文字放在方括號內，後跟 URL 放在圓括號內：

[Google](https://www.google.com)

## 圖片
目前圖片需要使用右下角的add image上傳
${demoImgUrl ? `![](${demoImgUrl})` : ""}

## 引用

使用 \`>\` 來引用文字：

> 這是一段引用文字。

## 程式碼

你可以使用反引號來標記程式碼。對於單行程式碼，使用一個反引號：

\`程式碼\`

多行程式碼則使用三個反引號：
可以於上三個反引號寫上是什麼程式語言

\`\`\`javascript
console.log('Hello World')
\`\`\`


## 水平線

你可以使用三個或以上的星號、減號或底線來創建水平線：

---

`

  return mdx
}

