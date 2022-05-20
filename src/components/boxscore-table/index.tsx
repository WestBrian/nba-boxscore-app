import type { FC } from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode
} from '@chakra-ui/react'
import type { IBoxscore } from '../../types'

const headers = ['name', 'min', 'fg', '3pt', 'ft', 'reb', 'ast', 'pts', '+/-']

export interface BoxscoreTableProps {
  playerStats: NonNullable<IBoxscore['stats']>['activePlayers']
}

export const BoxscoreTable: FC<BoxscoreTableProps> = ({ playerStats }) => {
  const { colorMode } = useColorMode()

  function formatName(firstName: string, lastName: string) {
    return `${firstName[0]} ${lastName}`
  }

  function formatMinutes(minutes: string) {
    const arr = minutes.split(':')
    return arr[0]
  }

  return (
    <Box
      bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
      borderRadius={'md'}
      width={'full'}
    >
      <Table size={'sm'} variant={'simple'}>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header} isNumeric={header !== 'name'}>
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {playerStats.map((player, index) => (
            <Tr
              key={player.personId}
              borderBottom={index === 4 ? '8px' : undefined}
              borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            >
              <Td>{formatName(player.firstName, player.lastName)}</Td>
              <Td isNumeric>{formatMinutes(player.min)}</Td>
              <Td isNumeric>
                {player.fgm}-{player.fga}
              </Td>
              <Td isNumeric>
                {player.tpm}-{player.tpa}
              </Td>
              <Td isNumeric>
                {player.ftm}-{player.fta}
              </Td>
              <Td isNumeric>{player.totReb}</Td>
              <Td isNumeric>{player.assists}</Td>
              <Td isNumeric>{player.points}</Td>
              <Td isNumeric>{player.plusMinus}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
