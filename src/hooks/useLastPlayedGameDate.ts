import { useSchedule } from './useSchedule'
import type { LeagueScheduleResponse } from '../services/schedule.type'

function getHasPlayedGames(
  gameDate: LeagueScheduleResponse['leagueSchedule']['gameDates'][number]
) {
  return gameDate.games.some((game) => game.gameStatus > 1)
}

export function useLastPlayedGameDate() {
  const { data } = useSchedule()
  const gameDates = data?.leagueSchedule.gameDates

  if (!gameDates) {
    return null
  }

  for (let i = gameDates.length - 1; i >= 0; i--) {
    const gameDate = gameDates.at(i)
    if (gameDate && getHasPlayedGames(gameDate)) {
      return gameDate
    }
  }

  return null
}
