import { Metadata } from "next"
import BlogPost, {generateBlogPageMetadata, generateStaticBlogPageParams} from "../../components/BlogPage"
interface Params {
  params: {
    blogId: string // 從url拿進來的都是string
  }
}

const routerName = 'insight'

// 變成static
export function generateStaticParams() {
  return generateStaticBlogPageParams(routerName)
}

export function generateMetadata({ params: { blogId } }: Params):Metadata {
  return generateBlogPageMetadata({routerName, blogId})
}

export default async function Post({ params: { blogId } }: Params) {

  return (
    <BlogPost routerName={routerName} blogId={blogId}/>
  )
}