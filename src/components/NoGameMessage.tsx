import { Box, VStack, Code, Text, useColorModeValue } from '@chakra-ui/react'
import type { FC } from 'react'
import Image from 'next/image'
import Basketball from '../../public/basketball-color.png'

const useSecondaryColor = () => useColorModeValue('gray.600', 'gray.300')

export interface NoGameMessageProps {}

export const NoGameMessage: FC<NoGameMessageProps> = () => {
  const secondaryColor = useSecondaryColor()

  return (
    <Box
      w={'full'}
      h={'full'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box p={8} textAlign={'center'}>
        <VStack spacing={4}>
          <Image
            src={Basketball}
            width={75}
            height={75}
            alt={'basketball'}
            priority
          />
          <VStack spacing={1}>
            <Text fontWeight={'semibold'}>No game selected</Text>
            <Text fontSize={'sm'} color={secondaryColor}>
              Choose <Code>boxscore</Code> on a game from the sidebar
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
  )
}
