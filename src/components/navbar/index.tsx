import type { FC } from 'react'
import { Box, Text, Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
      height={65}
      paddingX={4}
      paddingY={2}
    >
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        height={'100%'}
      >
        <Text fontSize={24} fontWeight={'semibold'}>
          NBA Box Score
        </Text>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label={`Use ${colorMode} theme`}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  )
}
