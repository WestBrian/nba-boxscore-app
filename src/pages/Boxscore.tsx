import type { FC } from 'react'
import type { IBoxscore } from '../types'
import { Container, Box, VStack } from '@chakra-ui/react'
import { BoxscoreTable } from '../components/boxscore-table'

// https://cdn.nba.com/headshots/nba/latest/1040x760/${player.personId}.png

export interface BoxscoreProps {
  boxscore: IBoxscore
}

export const Boxscore: FC<BoxscoreProps> = ({ boxscore }) => {
  const hTeamBoxscore = boxscore.stats?.activePlayers.filter(
    (player) => player.teamId === boxscore.basicGameData.hTeam.teamId
  )
  const vTeamBoxscore = boxscore.stats?.activePlayers.filter(
    (player) => player.teamId === boxscore.basicGameData.vTeam.teamId
  )

  return (
    <Container padding={[8, 16]} centerContent>
      <VStack spacing={8}>
        <BoxscoreTable playerStats={hTeamBoxscore || []} />
        <BoxscoreTable playerStats={vTeamBoxscore || []} />
      </VStack>
    </Container>
  )
}
