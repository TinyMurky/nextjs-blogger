import Posts from "../components/Posts"
type Props = {}

export default function page({}: Props) {
  return (
    <main>
      <Posts readFolderUnderRoot="/public/blogs/tech" fileType="md" dir={null} />
    </main>
  )
}