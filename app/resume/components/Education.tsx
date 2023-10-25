import Link from "next/link"
import Image from "next/image"
type Props = {}

export default function Education({}: Props) {
  return (
    <section className="mt-16 mb-8">
      <h1 className="text-2xl mb-4 font-bold">學歷</h1>
      <hr className="mt-2 mb-4 h-px border-0 dark:bg-gray-500"/>
      <div className="outside-box w-full mt-12">
        <div className="mx-auto relative w-full md:w-11/12">
          <ul className="w-full">
            <li 
              className=" border-l-2 pd-2 pb-12 relative md:grid md:grid-cols-12 gap-4 dark:border-gray-300 before:absolute before:left-[-7px] before:-top-1 before:content-[' '] before:rounded-full before:dark:bg-gray-300 before:w-3 before:h-3">
              <div className="col-span-11  ps-4 lg:ps-16  w-full relative top-[-16px]">
                <h3 className="text-xl font-bold">ALPHA Camp</h3>
                <div className="my-4">
                  後端課程;
                  •
                  <span className="ms-1 dark:text-gray-300">
                    2023 年 2 月 - 2023 年 9 月
                  </span>
                </div>
                <div>
                  <ul className="list-disc mt-4 relative left-4 flex flex-col gap-2">
                    <li className="dark:text-white/70" >5 篇<Link target='_blank' className="dark:text-sky-300 hover:dark:bg-gray-500" href='/blogs/tech'>技術筆記</Link>於medium獲得 105 位viewers</li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block col-span-1 relative">
                <Image
                  src="/images/resume/alpha_camp_icon.png"
                  alt="Alpha Camp Icon"
                  height={200}
                  width={200}
                  loading="lazy"
                  className="rounded-full  relative top-[-12px]"
                />
              </div>
            </li>
            <li 
              className="border-l-2 pb-12 relative md:grid md:grid-cols-12 gap-4 dark:border-gray-300 before:absolute before:left-[-7px] before:-top-1 before:content-[' '] before:rounded-full before:dark:bg-gray-300 before:w-3 before:h-3">
              <div className="col-span-11 ps-4 lg:ps-16 w-full relative top-[-16px]">
                <h3 className="text-xl font-bold">國立台灣大學</h3>
                <div className="my-4">
                  會計學系研究所
                  •
                  <span className="ms-1 dark:text-gray-300">
                    2018 年 7 月 - 2021 年 8 月
                  </span>
                </div>
                <div>
                  <ul className="list-disc mt-4 relative left-4 flex flex-col gap-2">
                    <li className="dark:text-white/70" >
                      <span className="font-bold">畢業論文：</span>
                      <Link  target='_blank'  className="dark:text-sky-300 hover:dark:bg-gray-500" href="https://tdr.lib.ntu.edu.tw/bitstream/123456789/8399/1/U0001-1204202115134100.pdf">
                        利用深度學習預測審計失敗--以台灣為例
                      </Link>
                      <p>使用DNN預測會計師未查核出財務報表異常之可能性。</p>
                    </li>
                    <li className="dark:text-white/70" >
                      機器學習課程(2019)，成績為A，3人
                      <Link  target='_blank'  className="dark:text-sky-300 hover:dark:bg-gray-500" href="https://github.com/TinyMurky/ML2019FALL/blob/master/final/Report.pdf">
                        期末專案
                      </Link>
                      使用DANN模型進行跨Domain圖片辨識，模型正確率排名班級第一
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block  col-span-1 relative">
                <Image
                  src="/images/resume/ntu_icon.png"
                  alt="NTU Icon"
                  height={200}
                  width={200}
                  loading="lazy"
                  className="rounded-full  relative top-[-12px]"
                />
              </div>
            </li>
            <li 
              className=" relative md:grid md:grid-cols-12 gap-4 dark:border-gray-300 before:absolute before:left-[-5px] before:-top-2 before:content-[' '] before:rounded-full before:dark:bg-gray-300 before:w-3 before:h-3">
              <div className="col-span-11 ps-4 lg:ps-16 w-full relative top-[-16px]">
                <h3 className="text-xl font-bold">國立政治大學</h3>
                <div className="my-4">
                  會計學系
                  •
                  <span className="ms-1 dark:text-gray-300">
                    2014 年 7 月 - 2018 年 6 月
                  </span>
                </div>
                <div>
                  <ul className="list-disc mt-4 relative left-4 flex flex-col gap-2">
                    <li className="dark:text-white/70" >
                      於106(2017)學年度獲頒書卷獎。
                    </li>
                    <li className="dark:text-white/70" >
                      演算法、資料結構、程式設計等課程皆為A+
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block col-span-1 relative">
                <Image
                  src="/images/resume/nccu_icon.png"
                  alt="Nccu Icon"
                  height={200}
                  width={200}
                  loading="lazy"
                  className="rounded-full  relative top-[-12px]"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}