//contantLayer

import { Metadata } from "next"
import BlogPost, {generateBlogPageMetadata, generateStaticBlogPageParams} from "../../components/BlogPage"
interface Params {
  params: {
    blogId: string // 從url拿進來的都是string
  }
}

// 變成static
export function generateStaticParams() {
  return generateStaticBlogPageParams()
}

export function generateMetadata({ params: { blogId } }: Params):Metadata {
  return generateBlogPageMetadata({blogId})
}

export default async function Post({ params: { blogId } }: Params) {

  return (
    <BlogPost blogId={blogId}/>
  )
}