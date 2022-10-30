import type { FC } from 'react'
import type { BoxscoreResponse } from '../services/boxscore.type'
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import Image from 'next/image'

const useBg = () => useColorModeValue('white', 'gray.600')

interface TeamDetailsProps {
  team: BoxscoreResponse['game']['homeTeam']
  reverse?: boolean
}

const TeamDetails: FC<TeamDetailsProps> = ({ team, reverse = false }) => {
  return (
    <Flex
      direction={reverse ? 'row-reverse' : 'row'}
      gap={2}
      alignItems={'center'}
    >
      <Image
        src={`https://cdn.nba.com/logos/nba/${team.teamId}/primary/L/logo.svg`}
        width={75}
        height={75}
        alt={team.teamName}
      />
      <Box textAlign={reverse ? 'right' : 'left'}>
        <Text fontSize={'md'} fontWeight={'bold'}>
          {team.teamTricode}
        </Text>
        <Text fontSize={'3xl'} fontWeight={'bold'} mt={-2}>
          {team.score}
        </Text>
      </Box>
    </Flex>
  )
}

export interface ScoreDetailsProps {
  boxscore: BoxscoreResponse['game']
}

export const ScoreDetails: FC<ScoreDetailsProps> = ({ boxscore }) => {
  const isLive = boxscore.gameStatus === 2

  const bg = useBg()

  return (
    <Box p={4} bg={bg} rounded={'lg'} shadow={'lg'} w={'full'} maxW={'480px'}>
      <HStack
        display={['flex', 'none']}
        align={'center'}
        justify={'center'}
        mb={4}
      >
        {isLive && <Badge colorScheme={'red'}>LIVE</Badge>}
        <Text display={'inline-block'}>{boxscore.gameStatusText}</Text>
      </HStack>
      <Flex dir={'row'} justify={'space-between'} alignItems={'center'}>
        <TeamDetails team={boxscore.homeTeam} />
        <VStack spacing={1} display={['none', 'flex']}>
          <Text>{boxscore.gameStatusText}</Text>
          {isLive && <Badge colorScheme={'red'}>LIVE</Badge>}
        </VStack>
        <TeamDetails team={boxscore.awayTeam} reverse />
      </Flex>
    </Box>
  )
}
