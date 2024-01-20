import { format } from 'date-fns'
import type { Scoreboard } from '@/src/types/scoreboard'
import type { Summary } from '@/src/types/summary'

export async function getSchedule(date: Date) {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${format(
      date,
      'yyyyMMdd',
    )}`,
    {
      next: {
        revalidate: 60,
      },
    },
  )
  return res.json() as Promise<Scoreboard>
}

export async function getSummary(gameId: string) {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${gameId}`,
    {
      next: {
        revalidate: 60,
      },
    },
  )
  return res.json() as Promise<Summary>
}
