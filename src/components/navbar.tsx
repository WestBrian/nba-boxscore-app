import Link from 'next/link'
import { type FC } from 'react'
import { ScoreTicker } from '@/src/components/score-ticker'

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = async () => {
  return (
    <div>
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
      <ScoreTicker />
    </div>
  )
}
