import Link from "next/link"
import HamburgerButton from "./HamburgerButton"
import { GiKiwiBird } from "react-icons/gi";

export default function Navbar() {
  return (
    <>
      <nav className='sticky top-0 flex items-center flex-wrap bg-gray-600 bg-opacity-50 backdrop-blur-md p-3'>
        <Link href='/' className='inline-flex items-center p-2 mr-4 '>
          <span className='hidden lg:inline-flex text-xl text-white/90 font-bold tracking-wide'>
            Tiny Murky
          </span>
          <GiKiwiBird className='inline-block lg:hidden text-4xl text-white/90 font-bold tracking-wide' />
        </Link>
        <HamburgerButton />
      </nav>
    </>
  )
}
