import type { FC } from 'react'
import { Container, VStack, Text, Skeleton } from '@chakra-ui/react'
import type { IScoreboard } from '../types'
import { DayPicker } from '../components/day-picker'
import useSWR from 'swr'
import { nbaService } from '../services/nba.service'
import { customFetch } from '../utils/fetch'
import { GameSummaryCard } from '../components/game-summary-card'
import { useAtom } from 'jotai'
import { selectedDateAtom } from '../store'

export interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const { data } = useSWR<IScoreboard>(
    nbaService.getScoreboardPath(selectedDate),
    customFetch
  )

  return (
    <VStack w={'full'} spacing={8} pb={8}>
      <DayPicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Container paddingX={[4, 8, 16]} centerContent>
        <VStack spacing={[8, 16]} width={'full'}>
          <VStack spacing={[4, 8]} width={'full'}>
            {!data && <Skeleton w={[311, 400]} h={174} />}
            {data?.games.map((game) => (
              <GameSummaryCard key={game.gameId} game={game} />
            ))}
            {data?.games.length === 0 && <Text>There are no games today</Text>}
          </VStack>
        </VStack>
      </Container>
    </VStack>
  )
}
