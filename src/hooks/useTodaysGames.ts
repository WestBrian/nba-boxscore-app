import { useScoreboard } from './useScoreboard'

export function useTodaysGames() {
  const { data } = useScoreboard()
  return {
    games: data?.scoreboard.games
  }
}
