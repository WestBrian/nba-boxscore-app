import {
  Box,
  HStack,
  Text,
  useConst,
  useRadioGroup,
  useRadio,
  chakra
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import { selectedDateAtom } from '../store'
import { addDays, eachDayOfInterval, format, parse, subDays } from 'date-fns'

function dateToValue(date: Date) {
  return format(date, 'MM/dd/yyyy')
}

export interface DayRadioProps {
  date: Date
}

export const DayRadio: FC<DayRadioProps> = ({ date, ...radioProps }) => {
  const { state, getInputProps, getRadioProps, htmlProps } =
    useRadio(radioProps)

  return (
    <chakra.label {...htmlProps} cursor={'pointer'}>
      <input {...getInputProps()} hidden />
      <Box
        {...getRadioProps()}
        bg={'gray.700'}
        w={'50px'}
        p={2}
        textAlign={'center'}
        rounded={'md'}
        outline={state.isChecked ? '3px solid' : ''}
        outlineColor={'purple.400'}
      >
        <Text fontSize={'sm'} fontWeight={'semibold'} letterSpacing={'widest'}>
          {format(date, 'EEE')}
        </Text>
        <Text
          fontSize={'xs'}
          fontWeight={'semibold'}
          rounded={'md'}
          color={'gray.400'}
        >
          {format(date, 'MM/dd')}
        </Text>
      </Box>
    </chakra.label>
  )
}

export interface DayPickerProps {}

export const DayPicker: FC<DayPickerProps> = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const today = useConst(new Date())
  const dates = eachDayOfInterval({
    start: subDays(today, 1),
    end: addDays(today, 3)
  })

  const handleChange = (value: string) => {
    setSelectedDate(parse(value, 'MM/dd/yyyy', today))
  }

  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: dateToValue(selectedDate),
    onChange: handleChange
  })

  return (
    <HStack
      w={'full'}
      bg={'gray.600'}
      px={4}
      py={2}
      spacing={4}
      {...getRootProps()}
    >
      {dates.map((d) => (
        <DayRadio
          key={d.toString()}
          date={d}
          {...getRadioProps({ value: dateToValue(d) })}
        />
      ))}
    </HStack>
  )
}
