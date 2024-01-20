import { DayLeaders } from '@/src/components/day-leaders'
import { ScheduleHeader } from '@/src/components/schedule-header'
import { ScheduleSidebar } from '@/src/components/schedule-sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SlamStats | Schedule',
}

export default async function SchedulePage() {
  return (
    <div className="flex flex-col gap-16">
      <ScheduleHeader />
      <div className="flex flex-col gap-16 md:flex-row">
        <ScheduleSidebar />
        <div className="flex flex-1 flex-col gap-16">
          <h2 className="text-2xl">Player Leaders</h2>
          <DayLeaders />
        </div>
      </div>
    </div>
  )
}
