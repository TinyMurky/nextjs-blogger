import Image from "next/image"
import Link from "next/link"
type Props = {}

export default function Project({}: Props) {
  return (
    <section className="mt-16 mb-8">
      <h1 className="text-2xl mb-4 font-bold">Projects 專案經歷</h1>
      <hr className="mt-2 mb-4 h-px border-0 bg-gray-500"/>
      {/* 往下是blogger-------------------------------- */}
      <div className="lg:mt-16 lg:mb-8 lg:grid lg:grid-cols-12 mx-auto  gap-8 w-full">
        <div className="lg:col-span-5 mx-auto w-auto sm:w-96 lg:w-auto overflow-clip object-fill  ">
          <Image
            src='/images/resume/demo_blogger.png'
            alt='Blogger'
            width={800}
            height={600}
            style={{objectFit: "contain"}}
            loading="lazy"
            className="p-5 mx-auto"
          />
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-xl font-bold">個人部落格 X HackerMD</h3>
          <div className="my-4 flex flexflow items-center gap-2 text-xl">
            <Link className="hover:bg-gray-500 text-sky-300" href="/" target="_blank">網站連結</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="https://github.com/TinyMurky/nextjs-blogger" target="_blank">Github</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="/blogs/insight/Nextjs_Blogger" target="_blank">部落格</Link>
          </div>
          <div className="text-white/70">
            <p className="mb-4">
              單人Next.js 全端開發專案，可使用Markdown語法線上撰寫部落格。
            </p>
            <div className="mb-4">
              <h4 className="font-bold mb-2">專案功能：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">主畫面：</span>瀏覽所有文章、搜尋文章</li>
                <li className="text-white/70" ><span className="font-bold">部落格畫面：</span>圖片預載、留言版、Anchor Tag、可複製Code Block、部落格MD檔與圖片壓縮後下載</li>
                <li className="text-white/70" ><span className="font-bold">編輯畫面：</span>線上即時MD編輯器、編輯畫面預覽、圖片上傳雲端、儲存與發布文章</li>
                <li className="text-white/70" ><span className="font-bold">其他：</span>Github OAuth2 登入</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-bold mb-2">使用技術：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">Full-stack：</span>React、sass、swiperNext.js、Tailwind、TypeScript、Prisma、MySQL、NextAuth</li>
                <li className="text-white/70" ><span className="font-bold">Deploy：</span>Railway</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 往上是blogger-------------------------------- */}
      {/* 往下是coffee shop-------------------------------- */}
      {/* 往上是coffee shop-------------------------------- */}
      <div className="lg:mt-16 lg:mb-8 lg:grid lg:grid-cols-12 mx-auto  gap-8 w-full">
        <div className="lg:col-span-5 mx-auto w-auto sm:w-96 lg:w-auto overflow-clip object-fill  ">
          <Image
            src='/images/resume/demo_coffee_shop.png'
            alt='coffee_shop'
            width={800}
            height={600}
            style={{objectFit: "contain"}}
            loading="lazy"
            className="mx-auto"
          />
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-xl font-bold">Coffee Shop</h3>
          <div className="my-4 flex flexflow items-center gap-2 text-xl">
            <Link className="hover:bg-gray-500 text-sky-300" href="https://coffee-shop-eight-indol.vercel.app/#home" target="_blank">網站連結</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="https://github.com/TinyMurky/coffee_shop" target="_blank">Github</Link>
            |
            <Link className="hover:bg-gray-500 text-sky-300" href="/blogs/insight/Coffee_Shop" target="_blank">部落格</Link>
          </div>
          <div className="text-white/70">
            <p className="mb-4">
              前後分離專案，協助商家將原本使用Line的咖啡產品購物系統轉移到網頁上。
            </p>
            <p className="mb-4">
              使用者可瀏覽咖啡和咖啡器具的商品資訊，並將商品加入購物車後結帳，完成後傳送email通知，使用者亦可至訂單查詢頁面檢視購買記錄及取消訂單。
            </p>
            <div className="mb-4">
              <h4 className="font-bold mb-2">負責項目：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">規劃：</span>ERD設計、撰寫Postman文件</li>
                <li className="text-white/70" ><span className="font-bold">後端：</span>Sequelize Model、Seeder、實做瀏覽商品、打折活動、寄發email 等API，部署Railway</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-bold mb-2">使用技術：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">Front-end：</span>React、sass、swiper</li>
                <li className="text-white/70" ><span className="font-bold">Back-end：</span>Node.js、 Express.js、 MySQL、Sequelize、 Nodemailer</li>
                <li className="text-white/70" ><span className="font-bold">Deploy：</span>Railway、 Vercel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 往下是simple twitter */}
      <div className="lg:mt-16 lg:mb-8 lg:grid lg:grid-cols-12 mx-auto  gap-8 w-full">
        <div className="lg:col-span-5 mx-auto w-auto sm:w-96 lg:w-auto overflow-clip object-fill  ">
          <Image
            src='/images/resume/demo_simple_twitter.png'
            alt='simple-twitter'
            width={800}
            height={600}
            style={{objectFit: "contain"}}
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
              由 2 人團隊採全端的開發模式，在兩週內打造的簡易社群平台。
              擔任專案leader，負責進度規劃、主持會議、組內協調等工作。
            </p>
            <p className="mb-4">
              Simple Twitter 具備推文、回覆、按讚、追蹤等功能，並可呈現追蹤者推文與推文回覆，另設有後台管理員介面。
            </p>
            <div className="mb-4">
              <h4 className="font-bold mb-2">負責項目：</h4>
              <ul className="list-disc list-inside ">
                <li className="text-white/70" ><span className="font-bold">規劃：</span>前端Component分析、ERD設計、架設Notion計畫表</li>
                <li className="text-white/70" ><span className="font-bold">前端：</span>主畫面、User畫面、後台刻板、實做無限捲軸</li>
                <li className="text-white/70" ><span className="font-bold">後端：</span>主頁、推文、回覆、追蹤、按讚功能實做、部署AWS</li>
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
    </section>
  )
}