'use client'

import { ComplexGameCard } from '@/src/components/complex-game-card'
import { DatePicker } from '@/src/components/ui/datepicker'
import { getSchedule } from '@/src/lib/espn'
import type { Scoreboard } from '@/src/types/scoreboard'
import { useQuery } from '@tanstack/react-query'
import { format, isToday } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, type FC } from 'react'

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
    !homeTeam.team.name ||
    !awayTeam.team.name ||
    !homeTeam.team.logo ||
    !awayTeam.team.logo
  ) {
    return null
  }

  return (
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
  )
}

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const date = searchParams.get('date')
    ? new Date(searchParams.get('date') as string)
    : new Date()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const { data: schedule } = useQuery({
    queryKey: ['schedule', format(date, 'yyyy-MM-dd')],
    queryFn: () => getSchedule(date),
    refetchInterval: isToday(date) ? 30 * 1000 : false,
  })

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Schedule</h1>
          <p className="text-slate-400">{format(date, 'EEEE do, yyyy')}</p>
        </div>
        <div>
          <DatePicker
            date={date}
            setDate={(date) =>
              router.push(
                pathname +
                  '?' +
                  createQueryString('date', date?.toISOString() || ''),
              )
            }
          />
        </div>
      </div>
      <div>
        <div className="p-4 bg-slate-800 rounded-md flex flex-col gap-4 max-w-[525px]">
          {schedule?.events.map((event) => (
            <EventCard key={event.uid} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
