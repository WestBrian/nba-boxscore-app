import { type FC, useMemo } from 'react'
import { Button, HStack, useBreakpointValue } from '@chakra-ui/react'
import {
  eachDayOfInterval,
  addDays,
  subDays,
  format,
  isSameDay
} from 'date-fns'

export interface DayPickerProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export const DayPicker: FC<DayPickerProps> = ({
  selectedDate,
  setSelectedDate
}) => {
  // TODO: Find a fix for this
  const range = useBreakpointValue({ base: 1, md: 3 }, 'md')

  const interval = useMemo(() => {
    if (!range) {
      return []
    }
    const today = new Date()
    return eachDayOfInterval({
      start: subDays(today, range),
      end: addDays(today, range)
    })
  }, [range])

  return (
    <HStack spacing={4}>
      {interval.map((date) => (
        <Button
          key={date.toUTCString()}
          disabled={isSameDay(selectedDate, date)}
          onClick={() => setSelectedDate(date)}
        >
          {format(date, 'MM/dd')}
        </Button>
      ))}
    </HStack>
  )
}
