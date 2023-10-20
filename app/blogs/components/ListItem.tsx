import getFormattedDate from "@/libs/getFormattedDate"
import Link from "next/link"
import Image from "next/image";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import { BsFillTagFill } from "react-icons/bs";
interface Props {
  blog: Blog
}

export default function ListItem({ blog }: Props) {
  const {id, path, category, title, date, tag, readTime, cover, description} = blog
  const formattedDate:string = getFormattedDate(date)
  const image = cover ? (
    <Image
      src={cover}
      alt={title}
      width={600}
      height={800}
      style={{objectFit: "cover"}}
      loading="lazy"
    />
  ) : null
  return (
    <li className="mt-4 text-base lg:text-2xl dark:text-white/90">
      <div className="lg:text-xl text-xs mt-1 flex flex-row items-center my-2 dark:text-gray-400">
        <div className="flex flex-row items-center me-4">
          <AiFillCalendar className="me-2"/>{formattedDate}
        </div>
        |
        <div className="flex flex-row items-center mx-4">
          <AiFillClockCircle className="me-2"/>{readTime} min
        </div>
        |
        <div className="flex flex-row items-center ms-4">
          <BsFillTagFill className="me-2"/>{tag}
        </div>
      </div>

      <Link
        href={`/blogs${category}/${id}`}
        className="no-underline justify-between flex flex-row gap-4"
      >
        <div>
          <div className=" hover:text-black/70 dark:hover:text-white">
            <h2 className="font-bold mb-2">{title}</h2>
            <p className="text-base">
              {description}
            </p>
          </div>
        </div>
        <div className="hidden lg:inline-flex overflow-clip object-fill  aspect-[4/3] h-40 w-auto">
          {image}
        </div>
      </Link>
      <hr className="my-8"/>
    </li>
  )
}