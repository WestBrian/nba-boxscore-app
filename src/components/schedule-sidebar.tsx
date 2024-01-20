'use client'

import { useQuery } from '@tanstack/react-query'
import { format, isToday } from 'date-fns'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { getSchedule } from '@/src/lib/espn'
import Link from 'next/link'
import { Scoreboard } from '@/src/types/scoreboard'
import { ComplexGameCard } from '@/src/components/complex-game-card'
import { useDateParam } from '@/src/hooks/use-date-param'

interface EventCardProps {
  event: Scoreboard['events'][number]
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const searchParams = useSearchParams()
  const competition = event.competitions.at(0)

  if (!competition) {
    return null
  }

  const homeTeam = competition.competitors.at(0)
  const awayTeam = competition.competitors.at(1)

  if (
    !homeTeam ||
    !awayTeam ||
    !homeTeam.team.name ||
    !awayTeam.team.name ||
    !homeTeam.team.logo ||
    !awayTeam.team.logo
  ) {
    return null
  }

  const params = new URLSearchParams(searchParams)

  return (
    <Link href={`/schedule/${event.id}?${params.toString()}`}>
      <ComplexGameCard
        key={event.uid}
        dateTime={new Date(event.date)}
        isLive={event.status.type.state === 'in'}
        isComplete={event.status.type.state === 'post'}
        gameTime={event.status.displayClock}
        gamePeriod={event.status.period}
        homeTeamName={homeTeam.team.name}
        awayTeamName={awayTeam.team.name}
        homeTeamImage={homeTeam.team.logo}
        awayTeamImage={awayTeam.team.logo}
        homeTeamRecord={homeTeam.records[0].summary}
        awayTeamRecord={awayTeam.records[0].summary}
        homeTeamScore={homeTeam.score}
        awayTeamScore={awayTeam.score}
      />
    </Link>
  )
}

export interface ScheduleSidebarProps {}

export const ScheduleSidebar: FC<ScheduleSidebarProps> = ({}) => {
  const date = useDateParam()

  const { data: schedule } = useQuery({
    queryKey: ['schedule', format(date, 'yyyy-MM-dd')],
    queryFn: () => getSchedule(date),
    refetchInterval: isToday(date) ? 30 * 1000 : false,
  })

  return (
    <motion.div
      className="flex min-h-[250px] min-w-[285px] flex-col gap-4 rounded-md bg-slate-800 p-4 lg:min-w-[525px]"
      layout
    >
      {schedule?.events.map((event) => (
        <motion.div key={event.uid} layout>
          <EventCard event={event} />
        </motion.div>
      ))}
    </motion.div>
  )
}
