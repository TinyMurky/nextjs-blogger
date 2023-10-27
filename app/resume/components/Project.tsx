import Image from "next/image"
import Link from "next/link"
type Props = {}

export default function Project({}: Props) {
  return (
    <section className="mt-16 mb-8">
      <h1 className="text-2xl mb-4 font-bold">專案</h1>
      <hr className="mt-2 mb-4 h-px border-0 bg-gray-500"/>
      <div className="lg:mt-16 lg:mb-8 mx-auto lg:grid lg:grid-cols-12 gap-8 w-full">
        <div className="lg:col-span-5 mx-auto w-auto sm:w-96 lg:w-auto overflow-clip object-fill  aspect-[4/3]">
          <Image
            src='/images/resume/demo_simple_twitter.png'
            alt='simple-twitter'
            width={600}
            height={800}
            style={{objectFit: "cover"}}
            loading="lazy"
            className="mx-auto"
          />
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-xl font-bold">Simple Twitter</h3>
          <div className="my-4 flex flexflow items-center gap-2 text-xl">
            <Link className="hover:bg-gray-500 text-sky-300" href="http://simple-twitter-dev.ap-northeast-1.elasticbeanstalk.com/signin" target="_blank">網站連結</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="https://github.com/TinyMurky/simple-twitter" target="_blank">Github</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="/blogs/insight/Simple_Twitter" target="_blank">部落格</Link>
          </div>
          <div className="text-white/70">
            <p className="mb-4">
              由 3 人團隊採全端的開發模式，在兩週內打造的簡易社群平台。
            </p>
            <p className="mb-4">
              Simple Twitter 具備推文、回覆、按讚、追蹤等功能，並可呈現追蹤者推文與推文回覆，另設有後台管理員介面。
            </p>
            <div className="mb-4">
              <h4 className="font-bold mb-2">負責項目：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">前端：</span>主畫面、User畫面、後台刻板，實做無限捲軸</li>
                <li className="text-white/70" ><span className="font-bold">後端：</span>主頁、推文、回覆、追蹤、按讚功能實做，部署AWS</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-bold mb-2">使用技術：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">Front-end：</span>Bootstrap、Axios、HTML、CSS、JavaScript</li>
                <li className="text-white/70" ><span className="font-bold">Back-end：</span>lebars、MySQL、Sequelize、passport、imgur、bcrypt.js</li>
                <li className="text-white/70" ><span className="font-bold">Deploy：</span>AWS Elastic Beanstalk, Amazon RDS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}
      <div className="lg:mt-16 lg:mb-8 mx-auto lg:grid lg:grid-cols-12 gap-8 w-full">
        <div className="lg:col-span-5  mx-auto w-auto sm:w-96 lg:w-auto  overflow-clip object-fill  aspect-[4/3]">
          <Image
            src='/images/resume/demo_expense_tracker.png'
            alt='simple-twitter'
            width={600}
            height={800}
            style={{objectFit: "cover"}}
            loading="lazy"
            className="mx-auto"
          />
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-xl font-bold">記帳網站-我的私房錢</h3>
          <div className="my-4 flex flexflow items-center gap-2 text-xl">
            <Link className="hover:bg-gray-500 text-sky-300" href="http://ec2-35-78-73-49.ap-northeast-1.compute.amazonaws.com/" target="_blank">網站連結</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="https://github.com/TinyMurky/expense-tracker" target="_blank">Github</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="/blogs/insight/Expense_Tracker" target="_blank">部落格</Link>
          </div>
          <div className="text-white/70">
            <p className="mb-4">
              單人全端開發專案，為一日常記帳平台。
            </p>
            <p className="mb-4">
            具備新增、刪除、修改、分類一筆支出，並可依照日期與分類分呈現花費，也可呈現總花費金額。
            </p>
            <div className="mb-4">
              <h4 className="font-bold mb-2">使用技術：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">Front-end：</span>Bootstrap、HTML、CSS、JavaScript</li>
                <li className="text-white/70" ><span className="font-bold">Back-end：</span>Node.js、Express.js、handlebars、MongoDB、Mongoose、passport、bcrypt.js</li>
                <li className="text-white/70" ><span className="font-bold">Deploy：</span>Amazon Elastic Compute Cloud (Amazon EC2)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}