import type { NextPage } from 'next'
import { GameDetails } from '../../src/components/GameDetails'
import Head from 'next/head'

const BoxscorePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Boxscore</title>
      </Head>
      <GameDetails />
    </>
  )
}

export default BoxscorePage
