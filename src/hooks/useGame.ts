import useSWR from 'swr'
import type { Game, LeagueScheduleResponse } from '../services/schedule.type'
import { useMemo } from 'react'
import { useSchedule } from './useSchedule'

export function useGame(gameId: string) {
  const { data: schedule } = useSchedule()
  const game = useMemo(() => {
    const findGame = (game: Game) => game.gameId === gameId
    const gameDate = schedule?.leagueSchedule.gameDates.find((g) =>
      g.games.find(findGame)
    )
    return gameDate?.games.find(findGame)
  }, [schedule, gameId])
  return game
}
