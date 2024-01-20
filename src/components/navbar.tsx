import Link from 'next/link'
import { type FC } from 'react'
import { ScoreTicker } from '@/src/components/score-ticker'

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = async () => {
  return (
    <div>
      <nav className="mb-2 flex h-[75px] w-full flex-row items-center justify-between rounded-b-sm rounded-t-lg bg-slate-800 px-8">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-wider text-purple-500"
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
      <ScoreTicker />
    </div>
  )
}
