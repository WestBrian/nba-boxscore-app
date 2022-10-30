import type { FC } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { customFetch } from '../utils/fetch'
import type { BoxscoreResponse } from '../services/boxscore.type'
import { ScoreDetails } from './ScoreDetails'
import { NoGameMessage } from './NoGameMessage'
import { BoxscoreTable } from './BoxscoreTable'

export interface GameDetailsProps {}

export const GameDetails: FC<GameDetailsProps> = () => {
  const router = useRouter()
  const gameId = router.query.gameId as string

  const { data: boxscore } = useSWR(
    gameId ? `boxscore/${gameId}` : null,
    () => customFetch<BoxscoreResponse>(`/api/boxscore/${gameId}`),
    {
      refreshInterval: 1000 * 30
    }
  )

  return (
    <Box h={'full'} p={8}>
      {gameId ? (
        boxscore ? (
          <VStack spacing={8} pb={[0, 8]}>
            <ScoreDetails boxscore={boxscore.game} />
            <BoxscoreTable team={boxscore.game.homeTeam} />
            <BoxscoreTable team={boxscore.game.awayTeam} />
          </VStack>
        ) : null
      ) : (
        <NoGameMessage />
      )}
    </Box>
  )
}
