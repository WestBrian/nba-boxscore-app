import {
  Flex,
  VStack,
  Text,
  Link,
  useConst,
  HStack,
  Container,
  Box
} from '@chakra-ui/react'
import { format, parse } from 'date-fns'
import type { FC } from 'react'
import NextLink from 'next/link'
import { useScoreboard } from '../hooks/useScoreboard'
import { LiveGameCard } from './LiveGameCard'

export interface ScheduleBarProps {}

export const ScheduleBar: FC<ScheduleBarProps> = () => {
  const { data, isLoading } = useScoreboard()

  return (
    <Box bg={'gray.900'} w={'full'}>
      <Container maxW={'container.lg'}>
        <VStack w={'full'} align={'start'} p={4}>
          <Flex
            w={'full'}
            direction={['column-reverse', 'row']}
            justify={'space-between'}
            align={['flex-start', 'center']}
            gap={[2, 0]}
          >
            {data && (
              <Text color={'gray.500'}>
                Games for{' '}
                {format(
                  parse(data.scoreboard.gameDate, 'yyyy-MM-dd', new Date()),
                  'EEEE, MMMM do'
                )}
              </Text>
            )}
            <Link
              as={NextLink}
              href={'/'}
              color={'blue.500'}
              fontWeight={'semibold'}
            >
              Full Schedule
            </Link>
          </Flex>
          <HStack w={'full'}>
            {isLoading ? (
              <Text>Loading</Text>
            ) : !data ? (
              <Text>There was an error</Text>
            ) : data.scoreboard.games.length > 0 ? (
              <HStack spacing={8}>
                {data.scoreboard.games.map((game) => (
                  <LiveGameCard key={game.gameId} game={game} />
                ))}
              </HStack>
            ) : (
              <Flex w={'full'} color={'gray.500'} fontWeight={'semibold'}>
                <Text>No games scheduled for today</Text>
              </Flex>
            )}
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
