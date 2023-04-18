import useSWR from 'swr'
import type { BoxscoreResponse } from '../services/boxscore.type'
import flatten from 'lodash/flatten'
import { customFetch } from '../utils/fetch'
import { useMemo } from 'react'

type Statistics =
  BoxscoreResponse['game']['homeTeam']['players'][number]['statistics']

function getLeaders(boxscores: BoxscoreResponse[], category: keyof Statistics) {
  const players = flatten(
    boxscores.map((boxscore) => [
      ...boxscore.game.homeTeam.players.map((p) => ({
        ...p,
        team: boxscore.game.homeTeam.teamTricode
      })),
      ...boxscore.game.awayTeam.players.map((p) => ({
        ...p,
        team: boxscore.game.awayTeam.teamTricode
      }))
    ])
  )
  const sorted = players.sort((a, b) => {
    if (a.statistics[category] > b.statistics[category]) {
      return -1
    } else if (a.statistics[category] < b.statistics[category]) {
      return 1
    } else {
      return 0
    }
  })

  return sorted
}

export function useLeaders(gameIds: string[], refresh = false) {
  const { data } = useSWR(
    gameIds,
    (ids) => {
      if (gameIds.length === 0) {
        return undefined
      }
      const requests = ids.map((id) =>
        customFetch<BoxscoreResponse>(`/api/boxscore/${id}`)
      )
      return Promise.all(requests)
    },
    {
      refreshInterval: refresh ? 1000 * 30 : undefined
    }
  )

  const pointLeaders = useMemo(() => getLeaders(data || [], 'points'), [data])
  const assistLeaders = useMemo(() => getLeaders(data || [], 'assists'), [data])
  const reboundLeaders = useMemo(
    () => getLeaders(data || [], 'reboundsTotal'),
    [data]
  )

  return {
    pointLeaders: pointLeaders.slice(0, 4),
    assistLeaders: assistLeaders.slice(0, 4),
    reboundLeaders: reboundLeaders.slice(0, 4)
  }
}
