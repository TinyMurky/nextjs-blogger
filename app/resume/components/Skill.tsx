type Props = {}

const skills: Array<{name: string, items:Array<string>}> = [
  {
    name:"Back-end",
    items:["Node.js / Express", "Python", "MySQL / Sequelize / Prisma", "AWS EC2/Elastic Beanstalk/RDS", "Railway / Vercel / Heroku", "RESTful API"]
  },
  {
    name:"Front-end",
    items:["Next.js / Tailwind", "JavaScript/TypeScript", "HTML5 / CSS3", "Bootstrap"],
  },
  {
    name:"Others",
    items:["MongoDB / Mongoose", "Git / Git Flow", "npm", "MVC Framework"]
  }
]

const skillBlock = (
  <div className="flex flex-col md:flex-row justify-between gap-8">
    {
      skills.map((skill) => {
        return (
          <div className="w-full" key={skill.name}>
            <h2 className="font-semibold text-xl text-white/80">{skill.name}</h2>
            <hr className="mt-2 mb-4 h-px border-0 bg-gray-500"/>
            <ul className="list-disc list-inside ">
            {
              skill.items.map(item => {
                return <li className="text-white/70" key={item}>{item}</li>
              })
            }
            </ul>
          </div>
        )
      })
    }
  </div>
)
export default function Skill({}: Props) {
  return (
    <section className="my-8">
      <h1 className="text-2xl mb-6 font-bold">Skills 技能</h1>
      {skillBlock}
    </section>
  )
}