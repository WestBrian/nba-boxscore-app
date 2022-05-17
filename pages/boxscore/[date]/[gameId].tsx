import type { GetServerSideProps, NextPage } from 'next'
import { Boxscore, BoxscoreProps } from '../../../src/pages/Boxscore'
import { nbaService } from '../../../src/services/nba.service'
import { parse } from 'date-fns'

const BoxscorePage: NextPage<BoxscoreProps> = ({ boxscore }) => {
  return <Boxscore boxscore={boxscore} />
}

export const getServerSideProps: GetServerSideProps<
  BoxscoreProps,
  { date: string; gameId: string }
> = async (context) => {
  const { date, gameId } = context.params!
  const boxscore = await nbaService.getBoxscore(
    parse(date, 'yyyyMMdd', new Date()),
    gameId
  )

  return {
    props: {
      boxscore
    }
  }
}

export default BoxscorePage
