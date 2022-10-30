import type { FC } from 'react'
import {
  Box,
  Text,
  Flex,
  IconButton,
  useColorMode,
  HStack
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import logo from '../../../public/basketball.png'
import Link from 'next/link'

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
        <Link href={'/'}>
          <a>
            <HStack spacing={2}>
              <Image
                src={logo}
                width={25}
                height={25}
                alt={'logo'}
                style={
                  colorMode === 'light' ? undefined : { filter: 'invert()' }
                }
              />
              <Text fontWeight={'semibold'} letterSpacing={'wider'}>
                BOXSCORE
              </Text>
            </HStack>
          </a>
        </Link>
        <IconButton
          variant={'ghost'}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label={`Use ${colorMode} theme`}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  )
}
