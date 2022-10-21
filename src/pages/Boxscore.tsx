import type { FC } from 'react'
import { Container, VStack, Text } from '@chakra-ui/react'
import { BoxscoreTable } from '../components/boxscore-table'
import { BoxscoreScore } from '../components/boxscore-score'
import { LeaderCards } from '../components/leader-cards'
import { AutoSizeTableProvider } from '../components/auto-size-table'
import type { BoxscoreResponse } from '../services/boxscore.types'

export interface BoxscoreProps {
  data: BoxscoreResponse
}

export const Boxscore: FC<BoxscoreProps> = ({ data }) => {
  return (
    <AutoSizeTableProvider>
      <Container maxW={'container.xl'} paddingY={[8, 16]} centerContent>
        <VStack spacing={8}>
          <BoxscoreScore boxscore={data.game} />
          <LeaderCards boxscore={data.game} />
          <BoxscoreTable stats={data.game.homeTeam} />
          <BoxscoreTable stats={data.game.awayTeam} />
          {/* {hTeamBoxscore && vTeamBoxscore ? (
            <>
              <BoxscoreTable
                teamName={data.basicGameData.hTeam.triCode}
                playerStats={hTeamBoxscore || []}
              />
              <BoxscoreTable
                teamName={data.basicGameData.vTeam.triCode}
                playerStats={vTeamBoxscore || []}
              />
            </>
          ) : (
            <Text>The boxscore will be available when the game starts</Text>
          )} */}
        </VStack>
      </Container>
    </AutoSizeTableProvider>
  )
}
