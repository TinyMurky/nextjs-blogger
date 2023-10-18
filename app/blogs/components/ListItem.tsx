import getFormattedDate from "@/libs/getFormattedDate"
import Link from "next/link"

interface Props {
  blog: Blog
}

export default function ListItem({ blog }: Props) {
  const {id, path, category, title, date} = blog
  const formattedDate:string = getFormattedDate(date)
  return (
    <li className="mt-4 text-2xl dark:text-white/90">
      <Link
        href={`/blogs${category}/${id}`}
        className="underline hover:text-black/70 dark:hover:text-white"
      >
        {title}
      </Link>
      <br />
      <p className="text-sm mt-1">{formattedDate}</p>
    </li>
  )
}