'use client'

import { format } from 'date-fns'
import type { FC } from 'react'
import { DatePicker } from '@/src/components/ui/datepicker'
import { useSearchParams } from 'next/navigation'
import { usePushQueryString } from '@/src/hooks/use-push-query-string'

export interface ScheduleHeaderProps {}

export const ScheduleHeader: FC<ScheduleHeaderProps> = ({}) => {
  const { pushQueryString } = usePushQueryString()
  const searchParams = useSearchParams()
  const date = searchParams.get('date')
    ? new Date(searchParams.get('date') as string)
    : new Date()

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:gap-0">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">Schedule</h1>
        <p className="text-slate-400">{format(date, 'EEEE do, yyyy')}</p>
      </div>
      <div>
        <DatePicker
          date={date}
          setDate={(date) => pushQueryString('date', date?.toISOString() || '')}
        />
      </div>
    </div>
  )
}
