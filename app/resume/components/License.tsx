import Link from "next/link"
import Image from "next/image"
type Props = {}

export default function License({}: Props) {
  return (
    <section className="mt-16 mb-8">
      <h1 className="text-2xl mb-4 font-bold">證照</h1>
      <hr className="mt-2 mb-8 h-px border-0 dark:bg-gray-500"/>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-8">
        <div className="md:col-span-1 grid grid-cols-6 gap-4">
          <div className="col-span-1">
            <Image
              src="/images/resume/考試院icon.jpeg"
              alt="考試院 Icon"
              height={200}
              width={200}
              loading="lazy"
              className="rounded-full"
            />
          </div>
          <div className="col-span-5">
            <p className="ms-1 dark:text-gray-300">
              2021 年 10 月
            </p>

            <Link target='_blank' className="font-bold text-lg dark:hover:bg-gray-500 dark:text-sky-300" href="/pdf/resume/會計師及格通知書.pdf">
              會計師高等考試及格證書
            </Link>
            <p className="dark:text-white/70 text-lg">
              考試院
            </p>
          </div>
        </div>
        <div className="md:col-span-1 grid grid-cols-6 gap-4">
          <div className="col-span-1">
            <Image
              src="/images/resume/jlpt_icon.avif"
              alt="JLPT Icon"
              height={200}
              width={200}
              loading="lazy"
              className="p-2 bg-white rounded-full"
            />
          </div>
          <div className="col-span-5">
            <p className="ms-1 dark:text-gray-300">
              2017 年 7 月
            </p>

            <Link target='_blank' className="font-bold text-lg dark:hover:bg-gray-500 dark:text-sky-300" href="/pdf/resume/日語N3_JEPT證書.pdf">
              日本語能力測驗 N3（JLPT N3）
            </Link>
            <p className="dark:text-white/70 text-lg">
              JEES - Japan Educational Exchanges and Services
            </p>
          </div>
        </div>
      </div>
    </ section>
  )
}