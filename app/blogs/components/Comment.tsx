'use client'
import Giscus from "@giscus/react"
const Comment = () => {
  const repoId:string = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
  const categoryId:string = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID
  return (
    <>
      <h3 id="留言" className="my-12 scroll-mt-20 text-xl">
        留言
      </h3>
      <div id="comment" className="mx-auto mb-12 max-w-prose py-12 px-4 bg-gray-700 rounded-lg p-4">
        <Giscus
          repo="TinyMurky/nextjs-blogger"
          repoId={repoId}
          category="Announcements"
          categoryId={categoryId}
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="noborder_dark"
          lang="en"
          loading="lazy"
        />
      </div>
    </>
  )
}

export default Comment;
