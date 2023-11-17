import type { Metadata } from 'next'
import { Noto_Sans_TC} from 'next/font/google'
import AuthProvider from './context/AuthProvider'
import './globals.css'
import './prism-plus.css'
import './prism-vsc-dark-plus.css'

// sweetalert 黑色風格
import 'sweetalert2/dist/sweetalert2.min.js'
import '@sweetalert2/theme-bulma/bulma.css'

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
      <body className={` bg-gray-800`}>
        {/* for auth */}
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
