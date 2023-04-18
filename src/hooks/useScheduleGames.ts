import { format } from 'date-fns'
import { useSchedule } from './useSchedule'

export function useScheduleGames(date: Date) {
  const { data, isLoading } = useSchedule()
  const games = data?.leagueSchedule.gameDates.find((gameDate) =>
    gameDate.gameDate.includes(format(date, 'MM/dd/yyyy'))
  )
  return {
    games: games?.games,
    isLoading
  }
}
