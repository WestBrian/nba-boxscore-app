import useSWR from 'swr'
import type { Game, LeagueScheduleResponse } from '../services/schedule.type'
import { useMemo } from 'react'

export function useBroadcasters(gameId: string) {
  const { data: schedule } = useSWR<LeagueScheduleResponse>('schedule')
  const broadcasters = useMemo(() => {
    const findGame = (game: Game) => game.gameId === gameId
    const gameDate = schedule?.leagueSchedule.gameDates.find((g) =>
      g.games.find(findGame)
    )
    const game = gameDate?.games.find(findGame)
    const broadcasters = game?.broadcasters
    return broadcasters
      ? [
          ...broadcasters.nationalTvBroadcasters,
          ...broadcasters.homeTvBroadcasters,
          ...broadcasters.awayTvBroadcasters
        ]
      : []
  }, [gameId, schedule])
  return broadcasters
}
