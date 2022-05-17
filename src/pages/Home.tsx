import { type FC, useState } from 'react'
import { Container, VStack, Text } from '@chakra-ui/react'
import type { IScoreboard } from '../types'
import { DayPicker } from '../components/day-picker'
import useSWR from 'swr'
import { nbaService } from '../services/nba.service'
import { GameSummaryCard } from '../components/game-summary-card'

export interface HomeProps {
  scoreboard: IScoreboard
}

export const Home: FC<HomeProps> = ({ scoreboard: initialScoreboard }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { data } = useSWR(
    nbaService.getScoreboardPath(selectedDate),
    () => nbaService.getScoreboard(selectedDate),
    {
      fallbackData: initialScoreboard
    }
  )

  return (
    <Container padding={[8, 16]} centerContent>
      <VStack spacing={[8, 16]} width={'full'}>
        <DayPicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <VStack spacing={[4, 8]} width={'full'}>
          {data?.games.map((game) => (
            <GameSummaryCard key={game.gameId} game={game} />
          ))}
          {data?.games.length === 0 && <Text>There are no games today</Text>}
        </VStack>
      </VStack>
    </Container>
  )
}
