import Link from "next/link"
import Image from "next/image"
type Props = {}

export default function WorkingExperiance({}: Props) {
  return (
    <section className="mt-16 mb-8">
      <h1 className="text-2xl mb-4 font-bold">Experiences 工作經歷</h1>
      <hr className="mt-2 mb-4 h-px border-0 bg-gray-500"/>
      <div className="outside-box w-full mt-12">
        <div className="mx-auto relative w-full md:w-11/12">
          <ul className="w-full">
            <li 
              className=" border-l-2 pb-12 relative md:grid md:grid-cols-12 gap-4 border-gray-300 before:absolute before:left-[-7px] before:-top-1 before:content-[' '] before:rounded-full before:bg-gray-300 before:w-3 before:h-3">
              <div className="col-span-11 ps-4 lg:ps-16 w-full relative top-[-16px]">
                <h3 className="text-xl font-bold">Associate, 風險管理部門</h3>
                <div className="my-4">
                【
                  <Link target='_blank' className="hover:bg-gray-500 text-sky-300" href="https://www.pwc.tw/zh.html">資誠聯合會計師事務所 (PwC Taiwan)</Link>
                  】
                  •
                  <span className="ms-3 text-gray-300">
                    2022 年 3 月 - 2023 年 2 月
                  </span>
                </div>
                <div>
                  <p><span className="font-bold">公司簡述：</span>PwC為排名世界第二的會計師事務所，主要業務為財報審計、風險管理、法律服務等</p>
                  <ul className="list-disc mt-4 relative left-4 flex flex-col gap-2">
                    <li className="text-white/70" >主動提出自動化電腦審計作業的方案，利用Python pyrfc套件 搭配 SAP RFC連線，自動化下載客戶SAP設定檔。可省去手動下載的時間3小時</li>
                    <li className="text-white/70" >協助審計團隊年報查核任務，編寫審計軟體ACL Script，驗算4家公司會計系統是否有效，並提供審計團隊要求之特定異常分錄，可於要求時間提前3至4日交付成果</li>
                    <li className="text-white/70" >輔導3家公司建立內部控制制度，並為其執行公開發型內部控制專審，1家已成功興櫃</li>
                    <li className="text-white/70" >完成24家公司資訊技術一般控制審計(ITGC)專案，提供會計師團隊公司資訊部門查核風險以利規劃後續審計任務，審查報告皆準時交付與會計師團隊</li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block  col-span-1 relative">
                <Image
                  src="/images/resume/pwc_icon.png"
                  alt="Pwc Icon"
                  height={200}
                  width={200}
                  loading="lazy"
                  className="rounded-full  relative top-[-12px]"
                />
              </div>
            </li>
            <li 
              className=" relative md:grid md:grid-cols-12 gap-4 border-gray-300 before:absolute before:left-[-5px] before:-top-2 before:content-[' '] before:rounded-full before:bg-gray-300 before:w-3 before:h-3">
              <div className="col-span-11 ps-4 lg:ps-16 w-full relative top-[-16px]">
                <h3 className="text-xl font-bold">Intern, 一般審計部門</h3>
                <div className="my-4">
                【
                  <Link target='_blank' className="hover:bg-gray-500 text-sky-300" href="https://www.pwc.tw/zh.html">資誠聯合會計師事務所 (PwC Taiwan)</Link>
                  】
                  •
                  <span className="ms-3 text-gray-300">
                    2017 年 7 月 - 2018 年 2 月
                  </span>
                </div>
                <div>
                  <p><span className="font-bold">公司簡述：</span>PwC為排名世界第二的會計師事務所，主要業務為財報審計、風險管理、法律服務等</p>
                  <ul className="list-disc mt-4 relative left-4 flex flex-col gap-2">
                    <li className="text-white/70" >助查核團隊年報查核事項，負責5家公司翻閱憑證、操作ERP與撰寫底稿等相關工作</li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block col-span-1 relative">
                <Image
                  src="/images/resume/pwc_icon.png"
                  alt="Pwc Icon"
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