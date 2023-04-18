import type { FC } from 'react'
import type { BoxscoreResponse } from '../services/boxscore.type'
import {
  Box,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  useColorModeValue
} from '@chakra-ui/react'
import { useIsGameLive } from '../hooks/useIsGameLive'

const useBg = () => useColorModeValue('white', 'gray.600')
const useSecondaryColor = () => useColorModeValue('gray.600', 'gray.400')
const useBorderColor = () => useColorModeValue('gray.200', 'gray.700')

const formatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

export interface BoxscoreTableProps {
  gameId: string
  team: BoxscoreResponse['game']['homeTeam']
}

export const BoxscoreTable: FC<BoxscoreTableProps> = ({ gameId, team }) => {
  const bg = useBg()
  const secondaryColor = useSecondaryColor()
  const borderColor = useBorderColor()

  const isLive = useIsGameLive(gameId)

  function formatMinutes(minutes: string) {
    const match = minutes.match(/[0-9]+/)
    return match ? (match[0] === '00' ? '—' : match[0]) : '—'
  }

  function formatPlusMinus(plusMinus: number) {
    if (plusMinus > 0) {
      return `+${plusMinus}`
    }
    return plusMinus
  }

  function formatPercentage(perc: number) {
    const padStart = (p: string, num: number) => {
      const padNum = num - p.length
      return Array.from(Array(padNum)).map((_, i) => (
        <Box key={i} as={'span'}>
          &nbsp;
        </Box>
      ))
    }

    const formPerc = formatter.format(perc)
    return (
      <Box as={'span'} color={secondaryColor}>
        {padStart(formPerc, 4)}
        {formPerc}
      </Box>
    )
  }

  return (
    <Box w={'full'}>
      <VStack w={'full'} spacing={2} align={'start'}>
        <Text fontWeight={'semibold'} letterSpacing={'widest'}>
          {team.teamName.toUpperCase()}
        </Text>
        <Table
          w={'full'}
          variant={'simple'}
          bg={bg}
          size={'sm'}
          rounded={'md'}
          fontFamily={'mono'}
        >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                Min
              </Th>
              <Th isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                FG
              </Th>
              <Th isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                3PT
              </Th>
              <Th isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                FT
              </Th>
              <Th isNumeric>Reb</Th>
              <Th isNumeric>Ast</Th>
              <Th isNumeric>Pts</Th>
              <Th isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                +/-
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {team.players.map((player, i) => (
              <Tr
                key={player.personId}
                borderBottom={i === 4 ? '4px' : '1px'}
                borderColor={borderColor}
              >
                <Td display={{ base: 'none', xl: 'table-cell' }}>
                  {player.firstName} {player.familyName}{' '}
                  {isLive && player.oncourt === '1' && '○'}
                </Td>
                <Td display={{ base: 'table-cell', xl: 'none' }}>
                  {player.firstName[0]} {player.familyName}{' '}
                  {isLive && player.oncourt === '1' && '○'}
                </Td>
                <Td isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                  {formatMinutes(player.statistics.minutesCalculated)}
                </Td>
                <Td isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                  {player.statistics.fieldGoalsMade}-
                  {player.statistics.fieldGoalsAttempted}{' '}
                  {formatPercentage(player.statistics.fieldGoalsPercentage)}
                </Td>
                <Td isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                  {player.statistics.threePointersMade}-
                  {player.statistics.threePointersAttempted}{' '}
                  {formatPercentage(player.statistics.threePointersPercentage)}
                </Td>
                <Td isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                  {player.statistics.freeThrowsMade}-
                  {player.statistics.freeThrowsAttempted}{' '}
                  {formatPercentage(player.statistics.freeThrowsPercentage)}
                </Td>
                <Td isNumeric>{player.statistics.reboundsTotal}</Td>
                <Td isNumeric>{player.statistics.assists}</Td>
                <Td isNumeric>{player.statistics.points}</Td>
                <Td isNumeric display={{ base: 'none', xl: 'table-cell' }}>
                  {formatPlusMinus(player.statistics.plusMinusPoints)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  )
}
