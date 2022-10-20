import type { FC } from 'react'
import { HStack, VStack, IconButton, Button, Text } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { eachDayOfInterval, addDays, format, isSameDay } from 'date-fns'
import { useAtom } from 'jotai'
import { initialDateAtom } from '../../store'

export interface DayPickerProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export const DayPicker: FC<DayPickerProps> = ({
  selectedDate,
  setSelectedDate
}) => {
  const [initialDate] = useAtom(initialDateAtom)

  const dates = eachDayOfInterval({
    start: initialDate,
    end: addDays(initialDate, 27)
  })

  return (
    <HStack
      w={'full'}
      spacing={8}
      p={4}
      borderBottom={'1px'}
      borderColor={'gray.900'}
    >
      <IconButton
        size={'lg'}
        icon={<CalendarIcon />}
        aria-label={'Open calendar'}
      />
      <HStack
        w={'full'}
        spacing={4}
        overflowX={'scroll'}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {dates.map((date) => (
          <Button
            key={format(date, 'MM/dd')}
            variant={isSameDay(selectedDate, date) ? 'solid' : 'ghost'}
            boxShadow={isSameDay(selectedDate, date) ? 'lg' : undefined}
            px={3}
            py={8}
            minW={'fit-content'}
            onClick={() => setSelectedDate(date)}
          >
            <VStack spacing={1}>
              <Text
                fontSize={'sm'}
                fontWeight={'bolder'}
                letterSpacing={'widest'}
              >
                {format(date, 'E').toUpperCase()}
              </Text>
              <Text fontSize={'sm'} fontWeight={'normal'} color={'GrayText'}>
                {format(date, 'MM/dd')}
              </Text>
            </VStack>
          </Button>
        ))}
      </HStack>
    </HStack>
  )
}
