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

const headers = [
  'name',
  'min',
  'fgm',
  'fga',
  'tpm',
  'tpa',
  'reb',
  'ast',
  'pts',
  '+/-'
]

const BlankRow: FC = () => {
  const { colorMode } = useColorMode()

  return (
    <Tr bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
    </Tr>
  )
}

export interface BoxscoreTableProps {
  playerStats: NonNullable<IBoxscore['stats']>['activePlayers']
}

export const BoxscoreTable: FC<BoxscoreTableProps> = ({ playerStats }) => {
  const { colorMode } = useColorMode()

  function formatName(firstName: string, lastName: string) {
    return `${firstName[0]} ${lastName}`
  }

  return (
    <Box
      bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
      borderRadius={'md'}
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
          {playerStats.map((player, index) =>
            index === 5 ? (
              <BlankRow />
            ) : (
              <Tr key={player.personId}>
                <Td>{formatName(player.firstName, player.lastName)}</Td>
                <Td isNumeric>{player.min}</Td>
                <Td isNumeric>{player.fgm}</Td>
                <Td isNumeric>{player.fga}</Td>
                <Td isNumeric>{player.tpm}</Td>
                <Td isNumeric>{player.tpa}</Td>
                <Td isNumeric>{player.totReb}</Td>
                <Td isNumeric>{player.assists}</Td>
                <Td isNumeric>{player.points}</Td>
                <Td isNumeric>{player.plusMinus}</Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Box>
  )
}
