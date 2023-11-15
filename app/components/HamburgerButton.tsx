'use client'
import Link from "next/link"
import { useState } from "react";
import { usePathname } from "next/navigation";

type routerLink = {
  path: string,
  name: string
}

const routerLinks:routerLink[] = [
  {
    path: '/resume',
    name: '我的履歷'
  },
  {
    path: '/blogs/tech',
    name: '技術文章'
  },
  {
    path: '/blogs/insight',
    name: '心得文章'
  },
  {
    path: '/blogs/edit',
    name: '編輯中'
  }
]


export default function HamburgerButton() {

  const pathname = usePathname();
  const [active, setActive] = useState(false)

  const handleHamburgerClick = () => {
    setActive(!active)
  }
  const handleLinkClick = () => {
    setActive(false) // auto close hambergur after click link
  }
  const linkTags = routerLinks.map(routerLink => {

    return (
      <Link 
        key={routerLink.path}
        href={routerLink.path}
        className={`${pathname === routerLink.path ? "underline " : ""}lg:inline-flex lg:w-auto w-full px-5 py-2 rounded text-white/90 font-bold items-center justify-center hover:underline  hover:decoration-2 hover:text-white cursor-pointer`}
        onClick={handleLinkClick}
      >
        {routerLink.name}
      </Link>)
  })
  return (
    <div className="ml-auto">
      <button 
        className=' inline-flex p-3 hover:bg-gray-500 rounded lg:hidden text-white/90 hover:text-white outline-none'
        onClick={handleHamburgerClick}
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      {/* 控制漢堡排開合 */}
      <div className={`${
          active ? '' : 'hidden'
        } w-full absolute top-full left-0 py-2 bg-gray-600 bg-opacity-50 lg:bg-opacity-0 lg:relative lg:top-auto lg:left-auto lg:py-0  lg:inline-flex lg:flex-grow lg:w-auto `}>
        <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
          {linkTags}
        </div>
      </div>
    </div>
  )
}
