import type { NextPage } from 'next'
import { Schedule, ScheduleProps } from '../src/pages/Schedule'

const HomePage: NextPage<ScheduleProps> = () => {
  return <Schedule />
}

export default HomePage
