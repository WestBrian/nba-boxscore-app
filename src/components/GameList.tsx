import { ArrowLeftIcon, CalendarIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, VStack, HStack, IconButton, Button } from '@chakra-ui/react'
import { subDays, format, addDays, isSameDay, parse } from 'date-fns'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import useSWR from 'swr'
import { LeagueScheduleResponse } from '../services/schedule.type'
import { ScoreboardResponse } from '../services/scoreboard.type'
import { selectedDateAtom } from '../store'
import { customFetch } from '../utils/fetch'
import { GameCard } from './GameCard'

export interface GameListProps {}

export const GameList: FC<GameListProps> = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const { data: schedule } = useSWR('schedule', () =>
    customFetch<LeagueScheduleResponse>('/api/schedule')
  )
  const { data: scoreboard } = useSWR(
    'scoreboard',
    () => customFetch<ScoreboardResponse>('/api/scoreboard'),
    {
      refreshInterval: 1000 * 30
    }
  )

  const showScoreboard = isSameDay(
    parse(scoreboard?.scoreboard.gameDate || '', 'yyyy-MM-dd', new Date()),
    selectedDate
  )
  const gameDate = schedule?.leagueSchedule.gameDates.find((game) =>
    game.gameDate.includes(format(selectedDate, 'M/dd/yyyy'))
  )
  const games = showScoreboard ? scoreboard?.scoreboard.games : gameDate?.games

  return (
    <Box p={8} display={'flex'} justifyContent={'center'}>
      <VStack spacing={12}>
        <HStack spacing={4}>
          <IconButton
            variant={'ghost'}
            icon={<ArrowLeftIcon />}
            color={'gray.400'}
            aria-label={'Go back a day'}
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          />
          <Button
            colorScheme={'blue'}
            variant={'outline'}
            leftIcon={<CalendarIcon />}
          >
            {format(selectedDate, 'E MM/dd/yyyy')}
          </Button>
          <IconButton
            variant={'ghost'}
            icon={<ArrowRightIcon />}
            color={'gray.400'}
            aria-label={'Go forward a day'}
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          />
        </HStack>
        <VStack w={'full'} spacing={8}>
          {games?.map((game) => (
            <GameCard key={game.gameId} game={game} />
          ))}
        </VStack>
      </VStack>
    </Box>
  )
}
