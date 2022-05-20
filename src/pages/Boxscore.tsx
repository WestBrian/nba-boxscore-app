import type { FC } from 'react'
import type { IBoxscore } from '../types'
import { Container, VStack, Text } from '@chakra-ui/react'
import { BoxscoreTable } from '../components/boxscore-table'
import { BoxscoreScore } from '../components/boxscore-score'
import useSWR from 'swr'
import { nbaService } from '../services/nba.service'
import { useRouter } from 'next/router'
import { parse } from 'date-fns'
import { customFetch } from '../utils/fetch'
import isEmpty from 'lodash/isEmpty'

// https://cdn.nba.com/headshots/nba/latest/1040x760/${player.personId}.png

export interface BoxscoreProps {}

export const Boxscore: FC<BoxscoreProps> = () => {
  const router = useRouter()
  const { data } = useSWR<IBoxscore>(
    () => {
      const date = parse(router.query.date as string, 'yyyyMMdd', new Date())
      const gameId = router.query.gameId as string
      return nbaService.getBoxscorePath(date, gameId)
    },
    customFetch,
    {
      refreshInterval: 30000
    }
  )

  if (!data) {
    return null
  }

  const hTeamBoxscore = data.stats?.activePlayers.filter(
    (player) => player.teamId === data.basicGameData.hTeam.teamId
  )
  const vTeamBoxscore = data.stats?.activePlayers.filter(
    (player) => player.teamId === data.basicGameData.vTeam.teamId
  )

  return (
    <Container maxW={'container.xl'} paddingY={[8, 16]} centerContent>
      <VStack spacing={8}>
        <BoxscoreScore boxscore={data} />
        <BoxscoreTable
          teamName={data.basicGameData.hTeam.triCode}
          playerStats={hTeamBoxscore || []}
        />
        <BoxscoreTable
          teamName={data.basicGameData.vTeam.triCode}
          playerStats={vTeamBoxscore || []}
        />
      </VStack>
    </Container>
  )
}
