import { useGame } from './useGame'

export function useBroadcasters(gameId: string) {
  const game = useGame(gameId)
  const broadcasters = game?.broadcasters
  return broadcasters
    ? [
        ...broadcasters.nationalTvBroadcasters,
        ...broadcasters.homeTvBroadcasters,
        ...broadcasters.awayTvBroadcasters
      ]
    : []
}
