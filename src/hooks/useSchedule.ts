import type { LeagueScheduleResponse } from '../services/schedule.type'
import { customFetch } from '../utils/fetch'
import useSWR from 'swr'

export function useSchedule() {
  const result = useSWR('schedule', () =>
    customFetch<LeagueScheduleResponse>('/api/schedule')
  )
  // if (result.data) {
  //   localStorage.setItem('schedule', JSON.stringify(result.data))
  // }
  return {
    ...result
  }
}
