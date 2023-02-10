import type { FC } from 'react'
import type { Game } from '../services/schedule.type'
import {
  Box,
  Text,
  VStack,
  HStack,
  Link,
  Badge,
  SimpleGrid,
  Button,
  Icon,
  Flex,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import type { LiveGame } from '../services/scoreboard.type'
import { default as NextLink } from 'next/link'
import { WatchModal } from './watch-modal'
import { useRouter } from 'next/router'
import { GlobeAmericasIcon } from '@heroicons/react/20/solid'
import { useBroadcasters } from '../hooks/useBroadcasters'

const useMetaBg = () => useColorModeValue('gray.200', 'gray.600')
const useBg = () => useColorModeValue('white', 'gray.700')
const useSecondaryColor = () => useColorModeValue('gray.600', 'white')
const useLinkColor = () => useColorModeValue('blue.500', 'blue.300')

interface TeamDateProps {
  team: Game['homeTeam'] | LiveGame['homeTeam']
}

const TeamData: FC<TeamDateProps> = ({ team }) => {
  const secondaryColor = useSecondaryColor()

  return (
    <HStack spacing={4} align={'center'}>
      <HStack spacing={2} align={'center'}>
        <Image
          src={`https://cdn.nba.com/logos/nba/${team.teamId}/primary/L/logo.svg`}
          width={50}
          height={50}
          alt={team.teamName}
        />
        <Box>
          <Text fontWeight={'bold'} color={secondaryColor}>
            {team.teamTricode}
          </Text>
          <Text fontSize={'xs'} letterSpacing={'tighter'}>
            ({team.wins}-{team.losses})
          </Text>
        </Box>
      </HStack>
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        {team.score}
      </Text>
    </HStack>
  )
}

export interface GameCardProps {
  game: Game | LiveGame
}

export const GameCard: FC<GameCardProps> = ({ game }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const broadcasters = useBroadcasters(game.gameId)
  const natlBroadcasters = broadcasters.filter(
    (broadcaster) => broadcaster.broadcasterScope === 'natl'
  )
  const hasNatlBroadcast = natlBroadcasters.length > 0
  const hasMainNatlBroadcast = natlBroadcasters.some(
    (broadcaster) => broadcaster.broadcasterAbbreviation !== 'NBA TV'
  )

  const isLive = game.gameStatus === 2
  const hasBoxscore = game.gameStatus > 1

  const metaBg = useMetaBg()
  const bg = useBg()
  const secondaryColor = useSecondaryColor()
  const linkColor = useLinkColor()

  return (
    <Box w={'full'} rounded={'md'} shadow={'lg'} overflow={'hidden'}>
      <SimpleGrid
        columns={3}
        p={4}
        bg={metaBg}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box w={'full'}>
          {isLive && <Badge colorScheme={'red'}>LIVE</Badge>}
        </Box>
        <Box w={'full'} textAlign={'center'}>
          <Text
            fontSize={'sm'}
            fontWeight={'bold'}
            color={secondaryColor}
            whiteSpace={'nowrap'}
          >
            {game.gameStatusText}
          </Text>
        </Box>
        <Flex w={'full'} align={'center'} justify={'flex-end'}>
          {hasNatlBroadcast && (
            <Tooltip
              label={'This game is being broadcasted nationally'}
              fontSize={'xs'}
            >
              <Icon
                as={GlobeAmericasIcon}
                color={hasMainNatlBroadcast ? 'cyan.500' : 'inherit'}
              />
            </Tooltip>
          )}
        </Flex>
      </SimpleGrid>
      <Box p={4} bg={bg}>
        <VStack spacing={4}>
          <TeamData team={game.homeTeam} />
          <TeamData team={game.awayTeam} />
        </VStack>
      </Box>
      <Box p={4} bg={metaBg} display={'flex'} justifyContent={'center'}>
        <HStack spacing={4}>
          <Box display={[hasBoxscore ? 'block' : 'none', 'none']}>
            <Link
              as={NextLink}
              href={`/boxscore/${game.gameId}`}
              color={linkColor}
              fontSize={'sm'}
              fontWeight={'bold'}
            >
              Boxscore
            </Link>
          </Box>
          <Button
            variant={'link'}
            display={['none', hasBoxscore ? 'block' : 'none']}
            color={linkColor}
            fontSize={'sm'}
            fontWeight={'bold'}
            onClick={() =>
              router.push(`/?gameId=${game.gameId}`, undefined, {
                shallow: true
              })
            }
          >
            Boxscore
          </Button>
          <Button
            variant={'link'}
            color={linkColor}
            fontSize={'sm'}
            fontWeight={'bold'}
            onClick={onOpen}
          >
            Watch
          </Button>
        </HStack>
        <WatchModal isOpen={isOpen} gameId={game.gameId} onClose={onClose} />
      </Box>
    </Box>
  )
}
