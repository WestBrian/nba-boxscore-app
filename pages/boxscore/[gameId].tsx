import type { GetServerSideProps, NextPage } from 'next'
import { Boxscore, BoxscoreProps } from '../../src/pages/Boxscore'

const BoxscorePage: NextPage<BoxscoreProps> = ({ data }) => {
  return <Boxscore data={data} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${ctx.params.gameId}.json`
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data
    }
  }
}

export default BoxscorePage
