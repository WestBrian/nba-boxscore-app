import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/src/components/navbar'
import { Providers } from '@/src/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SlamStats',
  description: 'SlamStats is a tool for seeing NBA statistics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
