import type { FC } from 'react'
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react'
import { GameList } from '../components/GameList'
import { GameDetails } from '../components/GameDetails'

const useBg = () => useColorModeValue('gray.100', 'gray.700')

export interface ScheduleProps {}

export const Schedule: FC<ScheduleProps> = () => {
  const bg = useBg()

  return (
    <Grid templateColumns={['1fr', null, 'min-content 1fr']}>
      <GridItem h={['full', null, 'calc(100vh - 65px)']} overflowY={'scroll'}>
        <GameList />
      </GridItem>
      <GridItem
        h={['full', null, 'calc(100vh - 65px)']}
        overflowY={'scroll'}
        display={['none', null, 'block']}
        bg={bg}
      >
        <GameDetails />
      </GridItem>
    </Grid>
  )
}
