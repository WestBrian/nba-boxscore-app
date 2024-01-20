'use client'

import { useQuery } from '@tanstack/react-query'
import { format, isToday } from 'date-fns'
import type { FC } from 'react'
import { useDateParam } from '@/src/hooks/use-date-param'
import { getSchedule } from '@/src/lib/espn'
import type { LeadersItem } from '@/src/types/scoreboard'
import { PlayerCard } from '@/src/components/player-card'
import { cn } from '@/src/lib/utils'

interface LeaderSectionProps {
  leaders: Array<LeadersItem>
  statDesc: 'points' | 'assists' | 'rebounds'
  getTeamColor: (leader: LeadersItem) => string
}

const LeaderSection: FC<LeaderSectionProps> = ({
  leaders,
  statDesc,
  getTeamColor,
}) => {
  return (
    <div className="flex flex-row gap-8">
      {leaders.slice(0, 3).map((leader, index) => {
        const athlete = leader.leaders?.at(0)?.athlete
        if (!athlete) return null
        return (
          <div
            key={athlete.id}
            className={cn({
              hidden: true,
              block: index === 0,
              'xl:block': index >= 1,
            })}
          >
            <PlayerCard
              name={athlete.displayName}
              image={athlete.headshot}
              statDesc={statDesc}
              statValue={leader.leaders?.at(0)?.displayValue || ''}
              color={getTeamColor(leader)}
            />
          </div>
        )
      })}
    </div>
  )
}

export interface DayLeadersProps {}

export const DayLeaders: FC<DayLeadersProps> = ({}) => {
  const date = useDateParam()

  const { data: schedule } = useQuery({
    queryKey: ['schedule', format(date, 'yyyy-MM-dd')],
    queryFn: () => getSchedule(date),
    refetchInterval: isToday(date) ? 30 * 1000 : false,
  })

  if (!schedule) {
    return null
  }

  const leaders: Array<LeadersItem> = []

  schedule.events.forEach((event) => {
    event.competitions.forEach((competition) => {
      competition.competitors.forEach((competitor) => {
        competitor.leaders?.forEach((leader) => {
          leaders.push(leader)
        })
      })
    })
  })

  function sortLeaders(a: LeadersItem, b: LeadersItem) {
    if (
      Number(a.leaders?.at(0)?.displayValue) <
      Number(b.leaders?.at(0)?.displayValue)
    ) {
      return 1
    } else if (
      Number(a.leaders?.at(0)?.displayValue) >
      Number(b.leaders?.at(0)?.displayValue)
    ) {
      return -1
    } else {
      return 0
    }
  }

  const pointLeaders = leaders
    .filter((leader) => leader.name === 'points')
    .sort(sortLeaders)

  const assistsLeaders = leaders
    .filter((leader) => leader.name === 'assists')
    .sort(sortLeaders)

  const reboundsLeaders = leaders
    .filter((leader) => leader.name === 'rebounds')
    .sort(sortLeaders)

  function getTeamColor(leader: LeadersItem) {
    const teamId = leader.leaders?.at(0)?.team?.id
    let color = 'black'
    const team = schedule?.events.forEach((event) => {
      return event.competitions.at(0)?.competitors.forEach((competitor) => {
        if (competitor.team.id === teamId) {
          color = competitor.team.color ? competitor.team.color : 'black'
        }
      })
    })
    return color
  }

  return (
    <div className="flex flex-col gap-12">
      <LeaderSection
        leaders={pointLeaders}
        statDesc="points"
        getTeamColor={getTeamColor}
      />
      <hr className="bg-slate-600" />
      <LeaderSection
        leaders={assistsLeaders}
        statDesc="assists"
        getTeamColor={getTeamColor}
      />
      <hr className="bg-slate-600" />
      <LeaderSection
        leaders={reboundsLeaders}
        statDesc="rebounds"
        getTeamColor={getTeamColor}
      />
    </div>
  )
}
