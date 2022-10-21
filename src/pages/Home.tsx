import type { FC } from 'react'
import { Container, VStack, Text, Skeleton } from '@chakra-ui/react'
import { DayPicker } from '../components/day-picker'
import useSWR from 'swr'
import { customFetch } from '../utils/fetch'
import { GameSummaryCard } from '../components/game-summary-card'
import { useAtom } from 'jotai'
import { selectedDateAtom } from '../store'
import { LeagueScheduleResponse } from '../services/leagueSchedule.types'
import { format } from 'date-fns'

export interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const { data: schedule } = useSWR('league-schedule', () =>
    customFetch<LeagueScheduleResponse>('/api/league-schedule')
  )

  const todaysGames = schedule?.leagueSchedule.gameDates.find((gameDate) =>
    gameDate.gameDate.includes(format(selectedDate, 'MM/dd/yyy'))
  )
  const games = todaysGames?.games

  return (
    <VStack w={'full'} spacing={8} pb={8}>
      <DayPicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Container paddingX={[4, 8, 16]} centerContent>
        <VStack spacing={[8, 16]} width={'full'}>
          <VStack spacing={[4, 8]} width={'full'}>
            {!schedule && <Skeleton w={[311, 400]} h={174} />}
            {games?.map((game) => (
              <GameSummaryCard key={game.gameId} game={game} />
            ))}
            {games?.length === 0 && <Text>There are no games today</Text>}
          </VStack>
        </VStack>
      </Container>
    </VStack>
  )
}
