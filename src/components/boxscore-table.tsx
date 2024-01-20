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

interface TeamTableProps {
  team: Summary['boxscore']['teams'][number]
  players: Summary['boxscore']['players'][number]
}

const TeamTable: FC<TeamTableProps> = ({ team, players }) => {
  return (
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
        {players.statistics.at(0)?.athletes?.map((athlete) => (
          <TableRow key={athlete.athlete.id} className="whitespace-nowrap">
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
  )
}

export interface BoxscoreTableProps {
  gameId: string
}

export const BoxscoreTable: FC<BoxscoreTableProps> = ({ gameId }) => {
  const { data: summary } = useQuery({
    queryKey: ['summary', gameId],
    queryFn: () => getSummary(gameId),
  })

  if (!summary) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
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
