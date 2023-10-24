import Introduction from "./components/Introduction"
import Skill from "./components/Skill"
import Project from "./components/Project"
import WorkingExperiance from "./components/WorkingExperiance"

export default function Home() {
  return (
    <main className="px-16 py-12 mt-20 mx-auto max-w-5xl dark:text-white/90 dark:bg-gray-600 dark:bg-opacity-50 rounded-lg">
      <Introduction />
      <Skill/>
      <Project />
      <WorkingExperiance />
    </main>
  )
}
