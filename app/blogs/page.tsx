import Posts from "./components/Posts"
type Props = {}

export default function page({}: Props) {
  return (
    <main>
      <Posts readFolderUnderRoot="/public/blogs" fileType="md" dir={null} />
    </main>
  )
}