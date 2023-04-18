import type { LeagueScheduleResponse } from '../services/schedule.type'
import { customFetch } from '../utils/fetch'
import useSWR from 'swr'

const storageKey = 'schedule-cache'
// const initialData =
//   typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null

export function useSchedule() {
  const result = useSWR('/api/schedule', (path) =>
    customFetch<LeagueScheduleResponse>(path)
  )

  return {
    ...result
  }
}
