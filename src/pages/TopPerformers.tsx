import { VStack, Heading, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { format, isToday } from 'date-fns'
import { useLeaders } from '../hooks/useLeaders'
import { PerformerCard } from '../components/PerformerCard'
import type { BoxscoreResponse } from '../services/boxscore.type'
import startCase from 'lodash/startCase'
import { useLastPlayedGameDate } from '../hooks/useLastPlayedGameDate'
import { getDateFromGameDate } from '../utils/getDateFromGameDate'

interface SectionProps {
  leaders: ReturnType<typeof useLeaders>['pointLeaders']
  category: keyof BoxscoreResponse['game']['homeTeam']['players'][number]['statistics']
}

const Section: FC<SectionProps> = ({ leaders, category }) => {
  return (
    <VStack w={'full'} align={'start'} spacing={4}>
      <Heading fontSize={'2xl'} color={'gray.400'} fontWeight={'normal'}>
        {startCase(category).split(' ').at(0)}
      </Heading>
      <HStack
        w={'full'}
        spacing={8}
        overflowX={'scroll'}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {leaders.map((leader) => (
          <PerformerCard
            key={`${leader.personId}-${category}`}
            player={leader}
            category={category}
          />
        ))}
      </HStack>
    </VStack>
  )
}

export interface TopPerformersProps {}

export const TopPerformers: FC<TopPerformersProps> = () => {
  const lastPlayedGameDate = useLastPlayedGameDate()

  const games = lastPlayedGameDate?.games
  const gameIds = games?.filter((g) => g.gameStatus > 1).map((g) => g.gameId)
  const hasLiveGame = games?.some((g) => g.gameStatus === 2)
  const { pointLeaders, assistLeaders, reboundLeaders } = useLeaders(
    gameIds || [],
    hasLiveGame
  )

  if (!lastPlayedGameDate) {
    return null
  }

  const date = getDateFromGameDate(lastPlayedGameDate)

  return (
    <VStack w={'full'} align={'start'} px={4} py={8} spacing={12}>
      <Heading fontSize={'3xl'} fontWeight={'normal'} mb={-4}>
        {isToday(date)
          ? `Today's Top Performers`
          : `Top Performers for ${format(date, 'MMMM do')}`}
      </Heading>
      <Section leaders={pointLeaders} category={'points'} />
      <Section leaders={assistLeaders} category={'assists'} />
      <Section leaders={reboundLeaders} category={'reboundsTotal'} />
    </VStack>
  )
}
