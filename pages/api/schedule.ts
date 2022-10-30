import type { NextApiRequest, NextApiResponse } from 'next'
import { getLeagueSchedule } from '../../src/services/nba'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const data = await getLeagueSchedule()
  res.status(200).json(data)
}
