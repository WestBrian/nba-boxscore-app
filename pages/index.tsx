import type { NextPage } from 'next'
import Head from 'next/head'
import { TopPerformers, TopPerformersProps } from '../src/pages/TopPerformers'

const HomePage: NextPage<TopPerformersProps> = () => {
  return (
    <>
      <Head>
        <title>Simple NBA Stats</title>
      </Head>
      <TopPerformers />
    </>
  )
}

export default HomePage
