'use client'

import { type FC, Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { getSchedule } from '@/src/lib/espn'
import { SimpleGameCard } from '@/src/components/simple-game-card'
import type { Scoreboard } from '@/src/types/scoreboard'

interface EventCardProps {
  event: Scoreboard['events'][number]
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const competition = event.competitions.at(0)

  if (!competition) {
    return null
  }

  const homeTeam = competition.competitors.at(0)
  const awayTeam = competition.competitors.at(1)

  if (
    !homeTeam ||
    !awayTeam ||
    !homeTeam.team.abbreviation ||
    !awayTeam.team.abbreviation
  ) {
    return null
  }

  return (
    <SimpleGameCard
      homeTeam={homeTeam.team.abbreviation}
      homeScore={homeTeam.score}
      awayTeam={awayTeam.team.abbreviation}
      awayScore={awayTeam.score}
      dateTime={new Date(event.date)}
      isLive={event.status.type.state === 'in'}
      isComplete={event.status.type.state === 'post'}
      gameTime={event.status.displayClock}
      gamePeriod={event.status.period}
    />
  )
}

export interface ScoreTickerProps {
  date: Date
}

export const ScoreTicker: FC<ScoreTickerProps> = ({ date }) => {
  console.log('date from server')
  console.log(date)

  const { data: schedule } = useQuery({
    queryKey: ['schedule', format(date, 'yyyy-MM-dd')],
    queryFn: () => getSchedule(date),
    refetchInterval: 30 * 1000,
  })

  if (!schedule) {
    return null
  }

  function sortEvents(
    a: Scoreboard['events'][number],
    b: Scoreboard['events'][number],
  ) {
    if (a.status.type.state === 'in' && b.status.type.state !== 'in') {
      return -1
    } else if (a.status.type.state !== 'in' && b.status.type.state === 'in') {
      return 1
    } else {
      return 0
    }
  }

  return (
    <div className="w-full bg-slate-700 rounded-t-sm rounded-b-lg flex flex-row gap-4 items-center px-8 py-1">
      {schedule.events.sort(sortEvents).map((event) => (
        <Fragment key={event.uid}>
          <EventCard event={event} />
          <div className="bg-slate-800 w-[2px] self-stretch" />
        </Fragment>
      ))}
    </div>
  )
}
