import { useColorModeValue } from '@chakra-ui/react'

export function useBgColor() {
  return useColorModeValue('gray.300', 'gray.700')
}
