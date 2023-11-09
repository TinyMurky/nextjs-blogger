import getFormattedDate from "@/libs/getFormattedDate"
import Link from "next/link"
import Image from "next/image";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai"
import { BsFillTagFill } from "react-icons/bs"
import { Blog } from "@prisma/client";
// import { replaceDotFolder } from "@/libs/removeRepeatUrl"
interface Props {
  blog: Blog
}

export default function ListItem({ blog }: Props) {
  const {title, category, createdAt, tag, readTime, cover, description} = blog
  const formattedDate:string = getFormattedDate(createdAt.toDateString())
  const image = cover ? (
    <Image
      src={cover}
      alt={title}
      width={1920}
      height={1080}
      style={{objectFit:"cover"}}
      loading="lazy"
    />
  ) : null
  return (
    <li className=" mt-4 text-base  lg:text-2xl text-white/90">
      <div className="p-2 lg:p-4 lg:text-xl text-xs mt-1 flex flex-row justify-between sm:justify-normal items-center my-2 text-gray-400">
        <div className="flex flex-row items-center md:me-4">
          <AiFillCalendar className="sm:me-2 me-1"/>{formattedDate}
        </div>
        |
        <div className="flex flex-row items-center md:mx-4">
          <AiFillClockCircle className="sm:me-2 me-1"/>{readTime} min
        </div>
        |
        <div className="flex flex-row items-center md:ms-4">
          <BsFillTagFill className="sm:me-2 me-1"/>{tag}
        </div>
      </div>

      <Link
        href={`/blogs/${category}`}
        className="no-underline p-2 lg:p-4  justify-between flex flex-row gap-4 rounded-md hover:bg-gray-600 hover:drop-shadow-2xl focus:bg-gray-600 focus:bg-opacity-50"
      >
        <div className="shrink">
          <div className="hover:text-black/70 hover:text-white">
            <h2 className="font-bold mb-2">{title}</h2>
            <p className="text-base">
              {description}
            </p>
          </div>
        </div>
        <div className="flex-none hidden lg:inline-flex overflow-clip object-fill aspect-[4/3] h-40 w-auto">
          {image}
        </div>
      </Link>
      <hr className="my-8"/>
    </li>
  )
}