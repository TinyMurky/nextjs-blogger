type Props = {}

const skills: Array<{name: string, items:Array<string>}> = [
  {
    name:"後端技能(Back-end)",
    items:["Node.js / Express", "Python", "AWS EC2/Elastic Beanstalk/RDS", "MySQL / Sequelize", "MongoDB / Mongoose", "RESTful API"]
  },
  {
    name:"前端技能(Front-end)",
    items:["Next.js / React", "HTML5 / CSS3", "JavaScript", "Bootstrap"],
  },
  {
    name:"其他技能",
    items:["Heroku", "Vercil", "Git / Git Flow", "npm", "MVC Framework"]
  }
]

const skillBlock = (
  <div className="flex flex-row justify-between gap-8">
    {
      skills.map((skill) => {
        return (
          <div className="w-full" key={skill.name}>
            <h2 className="font-semibold text-xl dark:text-white/80">{skill.name}</h2>
            <hr className="mt-2 mb-4 h-px border-0 dark:bg-gray-500"/>
            <ul className="list-disc list-inside ">
            {
              skill.items.map(item => {
                return <li className="dark:text-white/70" key={item}>{item}</li>
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
    <section className="my-4">
      <h1 className="text-2xl mb-6 font-bold">技能</h1>
      {skillBlock}
    </section>
  )
}