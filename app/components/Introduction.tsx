import Link  from "next/link";
import { MdPhoneIphone, MdEmail } from "react-icons/md";
import {AiFillLinkedin, AiOutlineGithub} from "react-icons/ai";
import { FaMedium } from "react-icons/fa6";
type Props = {}

export default function Introduction({}: Props) {
  return (
    <section className="mb-16">
      <p className="text-base dark:text-gray-400 font-bold">後端工程師 Back-end Engineer</p>
      <h1 className="text-2xl my-4 font-bold">徐佳揚 (Hsu, Chia-Yang)</h1>
      <div className=" text-lg mt-1 flex flex-row items-center my-2 ">
        <div className="flex flex-row items-center me-4">
          <MdPhoneIphone className="me-2"/>0912927203
        </div>
        |
        <div className="flex flex-row items-center ms-4">
          <MdEmail className="me-2"/>murky0830@gmail.com
        </div>
      </div>
      <div>
        <p className="text-base dark:text-white/70 my-4">
          畢業於國立臺灣大學會計學系研究所，從學習深度學習開始，轉而學習後端工程領域，於7個月的自學期間，掌握 JavaScript、Node. js、Express、MySQL、Python、 RESTful API 與 AWS EB部署等技能，並於期間整理技術筆記，發布於個人部落格。
        </p>
        <p className="text-base dark:text-white/70 my-4">
          任職於會計師事務所風險管理部門一年，負責電腦審計與內部控制專審，擅於主動提出優化方案、專案時程掌控。具備敏銳觀察、溝通技巧、客戶管理、多功處理等能力。
        </p>
      </div>
      <div className="flex flex-row gap-8 text-3xl">
        <Link className="hover:bg-gray-500" href='https://www.linkedin.com/in/chia-yang-hsu-a90818255/' target="_blank">
          <AiFillLinkedin />
        </Link>
        <Link className="hover:bg-gray-500 rounded-full" href='https://github.com/TinyMurky' target="_blank">
          <AiOutlineGithub />
        </Link>
        <Link className="hover:bg-gray-500 rounded-full" href='https://tinymurky.medium.com/' target="_blank">
          <FaMedium />
        </Link>
      </div>
    </section>
  )
}