import type { FC } from 'react'
import type { IBoxscore } from '../types'
import { Container, VStack, Text } from '@chakra-ui/react'
import { BoxscoreTable } from '../components/boxscore-table'
import { BoxscoreScore } from '../components/boxscore-score'
import useSWR from 'swr'
import { nbaService } from '../services/nba.service'
import { useRouter } from 'next/router'
import { parse } from 'date-fns'

// https://cdn.nba.com/headshots/nba/latest/1040x760/${player.personId}.png

export interface BoxscoreProps {
  boxscore: IBoxscore
}

export const Boxscore: FC<BoxscoreProps> = ({ boxscore: initialBoxscore }) => {
  const router = useRouter()
  const date = parse(router.query.date as string, 'yyyyMMdd', new Date())
  const gameId = router.query.gameId as string
  const { data: boxscore } = useSWR(
    nbaService.getBoxscorePath(date, gameId),
    () => nbaService.getBoxscore(date, gameId),
    {
      fallback: initialBoxscore,
      refreshInterval: 30000
    }
  )

  if (!boxscore) {
    return null
  }

  const hTeamBoxscore = boxscore.stats?.activePlayers.filter(
    (player) => player.teamId === boxscore.basicGameData.hTeam.teamId
  )
  const vTeamBoxscore = boxscore.stats?.activePlayers.filter(
    (player) => player.teamId === boxscore.basicGameData.vTeam.teamId
  )

  return (
    <Container maxW={'container.xl'} paddingY={[8, 16]} centerContent>
      <VStack spacing={8}>
        <BoxscoreScore boxscore={boxscore} />
        <VStack spacing={4}>
          <BoxscoreTable playerStats={hTeamBoxscore || []} />
          <BoxscoreTable playerStats={vTeamBoxscore || []} />
        </VStack>
      </VStack>
    </Container>
  )
}
