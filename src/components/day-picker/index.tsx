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
  const [middleDate, setMiddleDate] = useState(new Date())

  // TODO: Find a fix for this
  const range = useBreakpointValue({ base: 1, md: 3 }, 'md')

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

  return (
    <HStack spacing={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        size={'sm'}
        aria-label={`Previous ${range} days`}
        onClick={() =>
          setMiddleDate(subDays(middleDate, range ? range + 4 : 5))
        }
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
        aria-label={`Next ${range} days`}
        onClick={() =>
          setMiddleDate(addDays(middleDate, range ? range + 4 : 5))
        }
      />
    </HStack>
  )
}
