import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from '@/src/components/navbar'
import { Providers } from '@/src/components/providers'
import './globals.css'
import { getSchedule } from '@/src/lib/espn'
import { getShownDate } from '@/src/lib/getShownDate'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'SlamStats',
  description: 'SlamStats is a tool for seeing NBA statistics',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  const date = getShownDate()

  await queryClient.prefetchQuery({
    queryKey: ['schedule', format(date, 'yyyy-MM-dd')],
    queryFn: () => getSchedule(date),
  })

  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="p-8">
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-col gap-16">
              <Navbar />
              <main>{children}</main>
            </div>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  )
}
