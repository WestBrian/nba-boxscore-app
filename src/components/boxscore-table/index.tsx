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
import type { IBoxscore } from '../../types'
import { AutoSizeTable } from '../auto-size-table'
import { percentage } from '../../utils/percentage'

type StatKey = keyof NonNullable<IBoxscore['stats']>['activePlayers'][number]

const nameWidth = 142 as const
const mobileHeaders = ['name', 'reb', 'ast', 'pts']
const headers = ['name', 'min', 'fg', '3pt', 'ft', 'reb', 'ast', 'pts', '+/-']

interface TotalsRowProps {
  playerStats: NonNullable<IBoxscore['stats']>['activePlayers']
}

const TotalsRow: FC<TotalsRowProps> = ({ playerStats }) => {
  const breakpoint = useBreakpoint('md')

  function getTotal(key: StatKey) {
    return playerStats.reduce((prev, curr) => prev + Number(curr[key]), 0)
  }

  const totalFgm = getTotal('fgm')
  const totalFga = getTotal('fga')
  const totalTpm = getTotal('tpm')
  const totalTpa = getTotal('tpa')
  const totalFtm = getTotal('ftm')
  const totalFta = getTotal('fta')
  const totalReb = getTotal('totReb')
  const totalAst = getTotal('assists')
  const totalPts = getTotal('points')

  return (
    <>
      <Tr>
        <Td width={nameWidth} />
        {breakpoint !== 'base' && (
          <>
            <Td />
            <Td whiteSpace={'nowrap'} isNumeric>
              {totalFgm}-{totalFga}
            </Td>
            <Td whiteSpace={'nowrap'} isNumeric>
              {totalTpm}-{totalTpa}
            </Td>
            <Td whiteSpace={'nowrap'} isNumeric>
              {totalFtm}-{totalFta}
            </Td>
          </>
        )}
        <Td whiteSpace={'nowrap'} isNumeric>
          {totalReb}
        </Td>
        <Td whiteSpace={'nowrap'} isNumeric>
          {totalAst}
        </Td>
        <Td whiteSpace={'nowrap'} isNumeric>
          {totalPts}
        </Td>
        {breakpoint !== 'base' && <Td />}
      </Tr>
      {breakpoint !== 'base' && (
        <Tr>
          <Td width={nameWidth} />
          <Td />
          <Td whiteSpace={'nowrap'} isNumeric>
            {percentage(totalFgm, totalFga)}%
          </Td>
          <Td whiteSpace={'nowrap'} isNumeric>
            {percentage(totalTpm, totalTpa)}%
          </Td>
          <Td whiteSpace={'nowrap'} isNumeric>
            {percentage(totalFtm, totalFta)}%
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
  teamName: string
  playerStats: NonNullable<IBoxscore['stats']>['activePlayers']
}

export const BoxscoreTable: FC<BoxscoreTableProps> = ({
  teamName,
  playerStats
}) => {
  const { colorMode } = useColorMode()
  const breakpoint = useBreakpoint('md')

  function formatName(firstName: string, lastName: string) {
    return `${firstName[0]} ${lastName}`
  }

  function formatMinutes(minutes: string) {
    const arr = minutes.split(':')
    return arr[0]
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
      <Text fontWeight={'semibold'}>{teamName}</Text>
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
            {playerStats.map((player, index) => (
              <Tr
                key={player.personId}
                borderBottom={index === 4 ? '8px' : undefined}
                borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
              >
                <Td width={nameWidth}>
                  {formatName(player.firstName, player.lastName)}
                </Td>
                {breakpoint !== 'base' && (
                  <>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {formatMinutes(player.min)}
                    </Td>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {player.fgm}-{player.fga}
                    </Td>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {player.tpm}-{player.tpa}
                    </Td>
                    <Td whiteSpace={'nowrap'} isNumeric>
                      {player.ftm}-{player.fta}
                    </Td>
                  </>
                )}
                <Td whiteSpace={'nowrap'} isNumeric>
                  {player.totReb}
                </Td>
                <Td whiteSpace={'nowrap'} isNumeric>
                  {player.assists}
                </Td>
                <Td whiteSpace={'nowrap'} isNumeric>
                  {player.points}
                </Td>
                {breakpoint !== 'base' && (
                  <Td whiteSpace={'nowrap'} isNumeric>
                    {formatPlusMinus(player.plusMinus)}
                  </Td>
                )}
              </Tr>
            ))}
            <TotalsRow playerStats={playerStats} />
          </Tbody>
        </AutoSizeTable>
      </Box>
    </VStack>
  )
}
