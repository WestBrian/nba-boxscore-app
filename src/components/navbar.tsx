import Link from 'next/link'
import { type FC } from 'react'
import { getSchedule } from '@/src/lib/espn'
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query'
import { format, isBefore, subDays } from 'date-fns'
import { ScoreTicker } from '@/src/components/score-ticker'

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = async () => {
  const queryClient = new QueryClient()

  let date = new Date()
  const getYesterday = isBefore(
    date,
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11),
  )

  if (getYesterday) {
    date = subDays(date, 1)
  }

  await queryClient.prefetchQuery({
    queryKey: ['schedule', format(date, 'yyyy-MM-dd')],
    queryFn: () => getSchedule(date),
  })

  return (
    <div className="p-4">
      <nav className="h-[75px] w-full bg-slate-800 mb-2 rounded-t-lg rounded-b-sm flex flex-row items-center justify-between px-8">
        <Link
          href="/"
          className="text-purple-500 font-semibold text-2xl tracking-wider"
        >
          SlamStats
        </Link>
        <div className="flex flex-row gap-4">
          <Link href="/">Schedule</Link>
          {/* <Link href="/teams">Teams</Link>
          <Link href="/standings">Standings</Link>
          <Link href="/players">Players</Link> */}
        </div>
      </nav>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ScoreTicker />
      </HydrationBoundary>
    </div>
  )
}
