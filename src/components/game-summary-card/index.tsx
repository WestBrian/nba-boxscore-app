import type { FC } from 'react'
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import type { IScoreboard } from '../../types'
import Image from 'next/image'
import { nbaService } from '../../services/nba.service'
import Link from 'next/link'
import { useBgColor } from '../../hooks/useBgColor'
import { WatchModal } from '../watch-modal'
import get from 'lodash/get'
import type { LeagueScheduleResponse } from '../../services/leagueSchedule.types'
import { format } from 'date-fns'

type Game =
  LeagueScheduleResponse['leagueSchedule']['gameDates'][number]['games'][number]
type TeamInfo = Game['homeTeam']

interface TeamDetailsProps {
  team: TeamInfo
  playoffs?: IScoreboard['games'][number]['playoffs']['hTeam']
  playoffLoss?: string
  reverse?: boolean
}

const TeamDetails: FC<TeamDetailsProps> = ({
  team,
  playoffs,
  playoffLoss,
  reverse = false
}) => {
  const color = useColorModeValue('gray.600', 'gray.400')
  const win = get(playoffs, 'seriesWin', team.wins)
  const loss = playoffLoss || team.losses

  return (
    <Stack
      spacing={6}
      direction={reverse ? 'row-reverse' : 'row'}
      align={'center'}
    >
      <Stack
        spacing={2}
        direction={reverse ? 'row-reverse' : 'row'}
        align={'center'}
      >
        <Image
          src={nbaService.getLogoSrc(String(team.teamId))}
          width={50}
          height={50}
          alt={team.teamTricode}
        />
        <VStack spacing={0} align={'flex-start'}>
          <Text fontWeight={'semibold'}>{team.teamTricode}</Text>
          <Text fontSize={12} color={color}>
            ({win}-{loss})
          </Text>
        </VStack>
      </Stack>
      {team.score && (
        <Text fontSize={'2xl'} fontWeight={'semibold'}>
          {team.score}
        </Text>
      )}
    </Stack>
  )
}

export interface GameSummaryCardProps {
  game: Game
}

export const GameSummaryCard: FC<GameSummaryCardProps> = ({ game }) => {
  const bg = useBgColor()
  const footerBg = useColorModeValue('gray.100', 'gray.900')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box width={['full', 400]} borderRadius={'md'} bg={bg}>
        <VStack spacing={4} padding={4}>
          <Text>{game.gameStatusText.trim()}</Text>
          <Flex justifyContent={'space-between'} width={'full'}>
            <TeamDetails
              team={game.homeTeam}
              playoffs={get(game, 'playoffs.hTeam')}
              playoffLoss={get(game, 'playoffs.vTeam.seriesWin')}
            />
            <TeamDetails
              team={game.awayTeam}
              playoffs={get(game, 'playoffs.vTeam')}
              playoffLoss={get(game, 'playoffs.hTeam.seriesWin')}
              reverse
            />
          </Flex>
        </VStack>
        <Box
          borderBottomRadius={'md'}
          bg={footerBg}
          border={'2px'}
          borderColor={bg}
          padding={2}
        >
          <HStack spacing={4}>
            <Link href={`/boxscore/${game.gameId}`} passHref>
              <Button
                as={'a'}
                size={'sm'}
                variant={'solid'}
                colorScheme={'purple'}
              >
                Boxscore
              </Button>
            </Link>
            <Button
              size={'sm'}
              variant={'outline'}
              colorScheme={'purple'}
              onClick={onOpen}
            >
              Watch
            </Button>
          </HStack>
        </Box>
      </Box>
      <WatchModal
        gameId={game.gameId}
        isOpen={isOpen}
        broadcasts={game.broadcasters.nationalTvBroadcasters}
        onClose={onClose}
      />
    </>
  )
}
