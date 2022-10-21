import type { NextApiRequest, NextApiResponse } from 'next'
import type { LeagueScheduleResponse } from '../../src/services/leagueSchedule.types'

const url = `https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json`

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<LeagueScheduleResponse>
) {
  const response = await fetch(url)
  const data = await response.json()
  res.status(200).json(data)
}
