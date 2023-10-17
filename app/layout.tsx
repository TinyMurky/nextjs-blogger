import type { Metadata } from 'next'
import { Noto_Sans_TC} from 'next/font/google'
import './globals.css'

// components
import Navbar from './components/Navbar'

const inter = Noto_Sans_TC({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tiny_Murky\' Blogger',
  description: 'Blogger Created by Tiny_Murky',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={` dark:bg-gray-800`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
