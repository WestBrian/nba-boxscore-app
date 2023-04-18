import { parse } from 'date-fns'
import type { LeagueScheduleResponse } from '../services/schedule.type'

export function getDateFromGameDate(
  gameDate: LeagueScheduleResponse['leagueSchedule']['gameDates'][number]
) {
  return parse(gameDate.gameDate, 'MM/dd/yyyy 00:00:00', new Date())
}
