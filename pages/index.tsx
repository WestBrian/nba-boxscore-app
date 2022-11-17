import type { NextPage } from 'next'
import { Schedule, ScheduleProps } from '../src/pages/Schedule'
import Head from 'next/head'

const HomePage: NextPage<ScheduleProps> = () => {
  return (
    <>
      <Head>
        <title>Simple NBA Stats</title>
      </Head>
      <Schedule />
    </>
  )
}

export default HomePage
