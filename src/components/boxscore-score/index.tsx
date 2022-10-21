import { Stack, HStack, VStack, Text, Box } from '@chakra-ui/react'
import type { FC } from 'react'
import Image from 'next/image'
import { nbaService } from '../../services/nba.service'
import get from 'lodash/get'
import type { BoxscoreResponse } from '../../services/boxscore.types'

export interface ScoreSummaryProps {
  teamInfo: BoxscoreResponse['game']['homeTeam']
  reverse?: boolean
}

const ScoreSummary: FC<ScoreSummaryProps> = ({ teamInfo, reverse = false }) => {
  return (
    <Stack
      spacing={2}
      direction={reverse ? 'row-reverse' : 'row'}
      align={'center'}
    >
      <Image
        src={nbaService.getLogoSrc(String(teamInfo.teamId))}
        width={65}
        height={65}
        alt={teamInfo.teamTricode}
      />
      <Text fontSize={'2xl'} fontWeight={'semibold'}>
        {teamInfo.score}
      </Text>
    </Stack>
  )
}

export interface BoxscoreScoreProps {
  boxscore: BoxscoreResponse['game']
}

export const BoxscoreScore: FC<BoxscoreScoreProps> = ({ boxscore }) => {
  const seriesText = get(boxscore, 'basicGameData.playoffs.seriesSummaryText')

  return (
    <HStack spacing={[8, 16]}>
      <ScoreSummary teamInfo={boxscore.homeTeam} />
      <VStack>
        {seriesText && <Box h={18} />}
        <Text>{boxscore.gameStatusText.trim()}</Text>
        {seriesText && <Text fontSize={12}>{seriesText}</Text>}
      </VStack>
      <ScoreSummary teamInfo={boxscore.awayTeam} reverse />
    </HStack>
  )
}
