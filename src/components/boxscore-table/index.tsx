import type { FC } from 'react'
import {
  Box,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
  useColorMode,
  useBreakpoint
} from '@chakra-ui/react'
import { AutoSizeTable } from '../auto-size-table'
import type { BoxscoreResponse } from '../../services/boxscore.types'

const nameWidth = 142 as const
const mobileHeaders = ['name', 'reb', 'ast', 'pts']
const headers = ['name', 'min', 'fg', '3pt', 'ft', 'reb', 'ast', 'pts', '+/-']

interface TotalsRowProps {
  totals: BoxscoreResponse['game']['homeTeam']['statistics']
}

const TotalsRow: FC<TotalsRowProps> = ({ totals }) => {
  const breakpoint = useBreakpoint('md')

  function formatPercentage(num: number) {
    // return Math.round(num * 100) / 100
    const formatter = Intl.NumberFormat('en-US', {
      style: 'percent'
    })

    return formatter.format(num)
  }

  return (
    <>
      <Tr>
        <Td width={nameWidth} />
        {breakpoint !== 'base' && (
          <>
            <Td />
            <Td whiteSpace={'nowrap'} isNumeric>
              {totals.fieldGoalsMade}-{totals.fieldGoalsAttempted}
            </Td>
            <Td whiteSpace={'nowrap'} isNumeric>
              {totals.threePointersMade}-{totals.threePointersAttempted}
            </Td>
            <Td whiteSpace={'nowrap'} isNumeric>
              {totals.freeThrowsMade}-{totals.freeThrowsAttempted}
            </Td>
          </>
        )}
        <Td whiteSpace={'nowrap'} isNumeric>
          {totals.reboundsTotal}
        </Td>
        <Td whiteSpace={'nowrap'} isNumeric>
          {totals.assists}
        </Td>
        <Td whiteSpace={'nowrap'} isNumeric>
          {totals.points}
        </Td>
        {breakpoint !== 'base' && <Td />}
      </Tr>
      {breakpoint !== 'base' && (
        <Tr>
          <Td width={nameWidth} />
          <Td />
          <Td whiteSpace={'nowrap'} isNumeric>
            {formatPercentage(totals.fieldGoalsPercentage)}
          </Td>
          <Td whiteSpace={'nowrap'} isNumeric>
            {formatPercentage(totals.threePointersPercentage)}
          </Td>
          <Td whiteSpace={'nowrap'} isNumeric>
            {formatPercentage(totals.freeThrowsPercentage)}
          </Td>
          <Td />
          <Td />
          <Td />
          <Td />
        </Tr>
      )}
    </>
  )
}

export interface BoxscoreTableProps {
  stats: BoxscoreResponse['game']['homeTeam']
}

export const BoxscoreTable: FC<BoxscoreTableProps> = ({ stats }) => {
  const { colorMode } = useColorMode()
  const breakpoint = useBreakpoint('md')

  function formatName(firstName: string, lastName: string) {
    return `${firstName[0]} ${lastName}`
  }

  function formatMinutes(minutes: string) {
    const match = minutes.match(/[0-9]+/)
    return match ? (match[0] === '00' ? '—' : match[0]) : '—'
  }

  function formatPlusMinus(plusMinus: string) {
    if (plusMinus === '0' || plusMinus.includes('-') || plusMinus === '') {
      return plusMinus
    } else {
      return `+${plusMinus}`
    }
  }

  return (
    <VStack spacing={2} align={'flex-start'}>
      <Text fontWeight={'semibold'}>{stats.teamName}</Text>
      <Box
        bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
        borderRadius={'md'}
        width={'full'}
      >
        <AutoSizeTable size={'sm'} variant={'simple'}>
          <Thead>
            <Tr>
              {(breakpoint === 'base' ? mobileHeaders : headers).map(
                (header) => (
                  <Th key={header} isNumeric={header !== 'name'}>
                    {header}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {stats.players.map((player, index) => (
              <Tr
                key={player.personId}
                borderBottom={index === 4 ? '8px' : undefined}
                borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
              >
                <Td width={nameWidth}>
                  {formatName(player.firstName, player.familyName)}
                </Td>
                {breakpoint !== 'base' && (
                  <>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {formatMinutes(player.statistics.minutesCalculated)}
                    </Td>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {player.statistics.fieldGoalsMade}-
                      {player.statistics.fieldGoalsAttempted}
                    </Td>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {player.statistics.threePointersMade}-
                      {player.statistics.threePointersAttempted}
                    </Td>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {player.statistics.freeThrowsMade}-
                      {player.statistics.freeThrowsAttempted}
                    </Td>
                  </>
                )}
                <Td whiteSpace={'nowrap'} isNumeric>
                  {player.statistics.reboundsTotal}
                </Td>
                <Td whiteSpace={'nowrap'} isNumeric>
                  {player.statistics.assists}
                </Td>
                <Td whiteSpace={'nowrap'} isNumeric>
                  {player.statistics.points}
                </Td>
                {breakpoint !== 'base' && (
                  <Td whiteSpace={'nowrap'} isNumeric>
                    {formatPlusMinus(String(player.statistics.plusMinusPoints))}
                  </Td>
                )}
              </Tr>
            ))}
            <TotalsRow totals={stats.statistics} />
          </Tbody>
        </AutoSizeTable>
      </Box>
    </VStack>
  )
}
