import { Stack, HStack, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import type { IBoxscore } from '../../types'
import Image from 'next/image'
import { nbaService } from '../../services/nba.service'

export interface ScoreSummaryProps {
  teamSummary: IBoxscore['basicGameData']['hTeam']
  teamStats?: NonNullable<IBoxscore['stats']>['hTeam']
  reverse?: boolean
}

const ScoreSummary: FC<ScoreSummaryProps> = ({
  teamSummary,
  teamStats,
  reverse = false
}) => {
  return (
    <Stack
      spacing={2}
      direction={reverse ? 'row-reverse' : 'row'}
      align={'center'}
    >
      <Image
        src={nbaService.getLogoSrc(teamSummary.teamId)}
        width={65}
        height={65}
        alt={teamSummary.triCode}
      />
      <Text fontSize={'2xl'} fontWeight={'semibold'}>
        {teamStats?.totals.points || 0}
      </Text>
    </Stack>
  )
}

export interface BoxscoreScoreProps {
  boxscore: IBoxscore
}

export const BoxscoreScore: FC<BoxscoreScoreProps> = ({ boxscore }) => {
  function getClock() {
    return boxscore.basicGameData.isGameActivated
      ? `Q${boxscore.basicGameData.period.current} ${boxscore.basicGameData.clock}`
      : boxscore.basicGameData.endTimeUTC
      ? 'FINAL'
      : boxscore.basicGameData.startTimeEastern
  }

  return (
    <HStack spacing={[8, 16]}>
      <ScoreSummary
        teamSummary={boxscore.basicGameData.hTeam}
        teamStats={boxscore.stats?.hTeam}
      />
      <Text>{getClock()}</Text>
      <ScoreSummary
        teamSummary={boxscore.basicGameData.vTeam}
        teamStats={boxscore.stats?.vTeam}
        reverse
      />
    </HStack>
  )
}
