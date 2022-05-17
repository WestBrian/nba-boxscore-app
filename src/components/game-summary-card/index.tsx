import type { FC } from 'react'
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
  Stack,
  useColorMode
} from '@chakra-ui/react'
import type { IScoreboard } from '../../types'
import Image from 'next/image'
import { nbaService } from '../../services/nba.service'
import Link from 'next/link'

interface TeamDetailsProps {
  team: IScoreboard['games'][number]['hTeam']
  reverse?: boolean
}

const TeamDetails: FC<TeamDetailsProps> = ({ team, reverse = false }) => {
  const { colorMode } = useColorMode()

  return (
    <Stack
      spacing={2}
      direction={reverse ? 'row-reverse' : 'row'}
      align={'center'}
    >
      <Image
        src={nbaService.getLogoSrc(team.teamId)}
        width={50}
        height={50}
        alt={team.triCode}
      />
      <VStack spacing={0} align={'flex-start'}>
        <Text fontWeight={'semibold'}>{team.triCode}</Text>
        <Text
          fontSize={12}
          color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
        >
          ({team.win}-{team.loss})
        </Text>
      </VStack>
    </Stack>
  )
}

export interface GameSummaryCardProps {
  game: IScoreboard['games'][number]
}

export const GameSummaryCard: FC<GameSummaryCardProps> = ({ game }) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      width={['full', 400]}
      borderRadius={'md'}
      bg={colorMode === 'light' ? 'gray.300' : 'gray.700'}
    >
      <VStack spacing={4} padding={4}>
        <Text align={'center'}>{game.startTimeEastern}</Text>
        <Flex justifyContent={'space-between'} width={'full'}>
          <TeamDetails team={game.hTeam} />
          <TeamDetails team={game.vTeam} reverse />
        </Flex>
      </VStack>
      <Box
        borderBottomRadius={'md'}
        bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
        border={'2px'}
        borderColor={'gray.300'}
        padding={2}
      >
        <HStack spacing={4}>
          <Link
            href={`/boxscore/${game.homeStartDate}/${game.gameId}`}
            passHref
          >
            <Button
              as={'a'}
              size={'sm'}
              variant={'solid'}
              colorScheme={'purple'}
            >
              Boxscore
            </Button>
          </Link>
          <Button size={'sm'} variant={'outline'} colorScheme={'purple'}>
            Watch
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}
