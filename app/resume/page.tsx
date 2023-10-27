import Link from "next/link"
import Introduction from "./components/Introduction"
import Skill from "./components/Skill"
import Project from "./components/Project"
import WorkingExperiance from "./components/WorkingExperiance"
import Education from "./components/Education"
import License from "./components/License"

export default function Home() {
  return (
      <main className="px-8 lg:px-16 py-12 mt-20 mb-32 mx-auto max-w-5xl text-white/90 bg-gray-600 bg-opacity-50 rounded-lg">
        <Link  target='_blank'  className="font-bold relative top-[-100px] text-sky-300 hover:bg-gray-500" href="https://www.cakeresume.com/TinyMurky">
          CakeResume好讀版：點我
        </Link>
        <Introduction />
        <Skill/> 
        <Project />
        <WorkingExperiance />
        <Education />
        <License />
      </main>
  )
}
