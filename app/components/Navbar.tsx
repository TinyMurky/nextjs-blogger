'use client'
import Link from "next/link"
import { useState } from "react";
export default function Navbar() {
  const [active, setActive] = useState(false);

  const handleHamburgerClick = () => {
    setActive(!active);
  }
  return (
    <>
      <nav className='relative flex items-center flex-wrap bg-gray-600 p-3'>
        <Link href='/' className='inline-flex items-center p-2 mr-4 '>
          <span className='text-xl text-white/90 font-bold tracking-wide'>
            Tiny Murky
          </span>
        </Link>
        <button 
          className=' inline-flex p-3 hover:bg-gray-500 rounded lg:hidden text-white/90 ml-auto hover:text-white outline-none'
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
          } w-full absolute top-full left-0 py-2 bg-gray-600 lg:relative lg:top-auto lg:left-auto lg:py-0  lg:inline-flex lg:flex-grow lg:w-auto `}>
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
            <Link href='/' className='lg:inline-flex lg:w-auto w-full px-5 py-2 rounded text-white/90 font-bold items-center justify-center hover:underline  hover:decoration-2 hover:text-white'>
              Home
            </Link>
            <Link href='/blogs' className='lg:inline-flex lg:w-auto w-full px-5 py-2 rounded text-white/90 font-bold items-center justify-center hover:underline  hover:decoration-2 hover:text-white'>
              Blogs
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
