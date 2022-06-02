import type { FC } from 'react'
import {
  Box,
  Flex,
  Text,
  AspectRatio,
  useColorMode,
  VStack,
  SlideFade,
  useBreakpoint
} from '@chakra-ui/react'
import type { IBoxscore } from '../../types'
import Image, { type ImageProps } from 'next/image'
import get from 'lodash/get'

const categories = ['points', 'assists', 'rebounds'] as const

interface CardProps {
  name: string
  personId: string
  value: string
  priority?: ImageProps['priority']
}

const Card: FC<CardProps> = ({ name, personId, value, priority = false }) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      borderRadius={'md'}
      boxShadow={'lg'}
      paddingTop={4}
      paddingX={4}
      bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
      width={160}
      height={205}
    >
      <Flex direction={'column'} justify={'space-between'} height={'full'}>
        <VStack spacing={2}>
          <Text fontWeight={'semibold'}>{name}</Text>
          <Text fontWeight={'semibold'} fontSize={'3xl'}>
            {value}
          </Text>
        </VStack>
        <AspectRatio ratio={1040 / 760}>
          <Image
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${personId}.png`}
            layout={'fill'}
            alt={name}
            objectFit={'cover'}
            style={name === 'Player' ? { filter: 'brightness(0%)' } : undefined}
            priority={priority}
          />
        </AspectRatio>
      </Flex>
    </Box>
  )
}

export interface LeaderCardsProps {
  boxscore: IBoxscore
}

export const LeaderCards: FC<LeaderCardsProps> = ({ boxscore }) => {
  const breakpoint = useBreakpoint()

  function getLeaderInfo(
    boxscore: IBoxscore,
    team: 'hTeam' | 'vTeam',
    category: typeof categories[number]
  ) {
    const leadersPath = `stats[${team}].leaders[${category}]`

    return {
      name: get(boxscore, `${leadersPath}.players[0].lastName`, 'Player'),
      personId: get(boxscore, `${leadersPath}.players[0].personId`, '201939'),
      value: get(boxscore, `${leadersPath}.value`, '0')
    }
  }

  function getPriority(
    category: typeof categories[number],
    breakpoint: string
  ) {
    if (breakpoint === 'base') {
      if (category === 'points') {
        return true
      } else {
        return false
      }
    }

    return true
  }

  return (
    <Flex gap={8} direction={{ base: 'column', lg: 'row' }} width={'full'}>
      {categories.map((category) => (
        <SlideFade key={category} in offsetY={35}>
          <Box width={'full'}>
            <VStack spacing={2} align={{ base: 'center', lg: 'flex-start' }}>
              <Text casing={'uppercase'} fontWeight={'semibold'}>
                {category}
              </Text>
              <Flex
                gap={2}
                width={'full'}
                justify={{
                  base: 'center',
                  lg: 'flex-start'
                }}
              >
                <Card
                  {...getLeaderInfo(boxscore, 'hTeam', category)}
                  priority={getPriority(category, breakpoint)}
                />
                <Card
                  {...getLeaderInfo(boxscore, 'vTeam', category)}
                  priority={getPriority(category, breakpoint)}
                />
              </Flex>
            </VStack>
          </Box>
        </SlideFade>
      ))}
    </Flex>
  )
}
