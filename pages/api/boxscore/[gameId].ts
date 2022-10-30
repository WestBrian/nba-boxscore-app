import type { NextApiRequest, NextApiResponse } from 'next'
import { getBoxscore } from '../../../src/services/nba'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameId } = req.query
  const data = await getBoxscore(gameId as string)
  res.status(200).json(data)
}
