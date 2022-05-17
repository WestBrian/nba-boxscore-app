import type { GetServerSideProps, NextPage } from 'next'
import { Home, HomeProps } from '../src/pages/Home'
import { nbaService } from '../src/services/nba.service'

const HomePage: NextPage<HomeProps> = ({ scoreboard }) => {
  return <Home scoreboard={scoreboard} />
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const scoreboard = await nbaService.getScoreboard(new Date())

  return {
    props: {
      scoreboard
    }
  }
}

export default HomePage
