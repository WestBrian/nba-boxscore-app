'use client'

import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { getSummary } from '@/src/lib/espn'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/src/components/ui/table'
import type { Summary } from '@/src/types/summary'
import Image from 'next/image'
import { cn } from '@/src/lib/utils'

interface TeamTableProps {
  team: Summary['boxscore']['teams'][number]
  players: Summary['boxscore']['players'][number]
}

const TeamTable: FC<TeamTableProps> = ({ team, players }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={team.team.logo!}
          width={30}
          height={30}
          alt={team.team.displayName!}
        />
        <h2 className="text-2xl">{team.team.displayName}</h2>
      </div>
      <Table className="font-mono">
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            {players.statistics.at(0)?.labels?.map((label) => (
              <TableHead key={label} className="text-right">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.statistics.at(0)?.athletes?.map((athlete, index) => (
            <TableRow
              key={athlete.athlete.id}
              className={cn({
                'whitespace-nowrap': true,
                'border-b-8': index === 4,
              })}
            >
              <TableCell>{athlete.athlete.shortName}</TableCell>
              {athlete.stats.map((stat, i) => (
                <TableCell
                  key={`${athlete.athlete.id}-${stat}-${i}`}
                  className="whitespace-nowrap text-right"
                >
                  {stat}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export interface BoxscoreTableProps {
  gameId: string
}

export const BoxscoreTable: FC<BoxscoreTableProps> = ({ gameId }) => {
  const { data: summary } = useQuery({
    queryKey: ['summary', gameId],
    queryFn: () => getSummary(gameId),
    refetchInterval: 1000 * 30,
    staleTime: 0,
  })

  if (!summary) {
    return null
  }

  const homeScore = summary.boxscore.players
    .at(0)
    ?.statistics.at(0)
    ?.totals?.at(-1)
  const homeLogo = summary.boxscore.players.at(0)?.team.logo
  const awayScore = summary.boxscore.players
    .at(1)
    ?.statistics.at(0)
    ?.totals?.at(-1)
  const awayLogo = summary.boxscore.players.at(1)?.team.logo

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto flex flex-row gap-8 rounded-md bg-slate-800 p-4">
        <div className="flex flex-row items-center gap-2">
          <Image src={homeLogo!} width={50} height={50} alt={'home team'} />
          <div className="text-3xl font-semibold">{homeScore}</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-3xl font-semibold">{awayScore}</div>
          <Image src={awayLogo!} width={50} height={50} alt={'away team'} />
        </div>
      </div>
      <TeamTable
        team={summary.boxscore.teams.at(0)!}
        players={summary.boxscore.players.at(0)!}
      />
      <TeamTable
        team={summary.boxscore.teams.at(1)!}
        players={summary.boxscore.players.at(1)!}
      />
    </div>
  )
}
