import { type FC, useState, useMemo } from 'react'
import {
  Button,
  HStack,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'
import {
  eachDayOfInterval,
  addDays,
  subDays,
  format,
  isSameDay
} from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export interface DayPickerProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export const DayPicker: FC<DayPickerProps> = ({
  selectedDate,
  setSelectedDate
}) => {
  const [middleDate, setMiddleDate] = useState(selectedDate)

  // TODO: Find a fix for this
  const range = useBreakpointValue({ base: 1, md: 3 }, 'md') || 3

  const interval = useMemo(() => {
    if (!range) {
      return []
    }
    const today = middleDate
    return eachDayOfInterval({
      start: subDays(today, range),
      end: addDays(today, range)
    })
  }, [middleDate, range])

  const totalDatesShown = 1 + range * 2

  return (
    <HStack spacing={[2, 4]}>
      <IconButton
        icon={<ChevronLeftIcon />}
        size={'sm'}
        aria-label={`Previous ${totalDatesShown} days`}
        onClick={() => setMiddleDate(subDays(middleDate, totalDatesShown))}
      />
      {interval.map((date) => (
        <Button
          key={date.toUTCString()}
          disabled={isSameDay(selectedDate, date)}
          onClick={() => setSelectedDate(date)}
        >
          {format(date, 'MM/dd')}
        </Button>
      ))}
      <IconButton
        icon={<ChevronRightIcon />}
        size={'sm'}
        aria-label={`Next ${totalDatesShown} days`}
        onClick={() => setMiddleDate(addDays(middleDate, totalDatesShown))}
      />
    </HStack>
  )
}
