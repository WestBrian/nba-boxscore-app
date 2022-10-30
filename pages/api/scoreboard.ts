import type { NextApiRequest, NextApiResponse } from 'next'
import { getScoreboard } from '../../src/services/nba'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const data = await getScoreboard()
  res.status(200).json(data)
}
