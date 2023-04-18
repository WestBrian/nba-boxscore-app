import type { FC } from 'react'
import type { LiveGame } from '../services/scoreboard.type'
import { VStack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export interface LiveGameCardProps {
  game: LiveGame
}

export const LiveGameCard: FC<LiveGameCardProps> = ({ game }) => {
  const hasBoxscore = game.gameStatus > 1

  return (
    <NextLink href={hasBoxscore ? `/boxscore/${game.gameId}` : '#'}>
      <VStack
        align={'start'}
        spacing={2}
        w={'120px'}
        px={4}
        py={2}
        bg={'gray.700'}
        rounded={'md'}
      >
        <Text fontSize={'sm'} color={'gray.400'}>
          {game.gameStatusText}
        </Text>
        <VStack spacing={0} align={'start'}>
          <Text fontWeight={'semibold'} letterSpacing={'wider'}>
            {game.homeTeam.teamTricode} - {game.homeTeam.score}
          </Text>
          <Text fontWeight={'semibold'} letterSpacing={'wider'}>
            {game.awayTeam.teamTricode} - {game.awayTeam.score}
          </Text>
        </VStack>
      </VStack>
    </NextLink>
  )
}
