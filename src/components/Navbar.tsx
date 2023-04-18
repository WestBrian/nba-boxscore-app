import type { FC } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <Box as={'nav'} w={'full'} px={8} py={4} bg={'gray.700'}>
      <Flex w={'full'} h={'full'} justify={'space-between'} align={'center'}>
        <NextLink href={'/'}>
          <Text
            fontSize={'lg'}
            fontWeight={'semibold'}
            letterSpacing={'widest'}
          >
            SlamStats
          </Text>
        </NextLink>
        <Box />
      </Flex>
    </Box>
  )
}
