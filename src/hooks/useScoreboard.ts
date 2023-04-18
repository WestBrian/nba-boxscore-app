import useSWR from 'swr'
import type { ScoreboardResponse } from '../services/scoreboard.type'
import { customFetch } from '../utils/fetch'

export function useScoreboard() {
  return useSWR(
    '/api/scoreboard',
    (path) => customFetch<ScoreboardResponse>(path),
    {
      refreshInterval: 1000 * 30
    }
  )
}
