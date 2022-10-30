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
import Image, { type ImageProps } from 'next/image'
import type { BoxscoreResponse } from '../../services/boxscore.type'

const categories = ['points', 'assists', 'reboundsTotal'] as const

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
      height={225}
    >
      <Flex direction={'column'} justify={'space-between'} height={'full'}>
        <VStack spacing={2}>
          <Text fontWeight={'semibold'} fontSize={'3xl'}>
            {value}
          </Text>
          <Text fontWeight={'semibold'}>{name}</Text>
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
  boxscore: BoxscoreResponse['game']
}

export const LeaderCards: FC<LeaderCardsProps> = ({ boxscore }) => {
  const breakpoint = useBreakpoint()

  function getLeaderInfo(
    boxscore: BoxscoreResponse['game'],
    team: 'homeTeam' | 'awayTeam',
    category: typeof categories[number]
  ) {
    const players = boxscore[team].players
    const sorted = [...players].sort((a, b) => {
      const aV = a.statistics[category]
      const bV = b.statistics[category]
      if (aV > bV) {
        return -1
      } else if (aV < bV) {
        return 1
      } else {
        return 0
      }
    })
    const leader = sorted[0]

    return {
      name: leader.name,
      personId: String(leader.personId),
      value: String(leader.statistics[category])
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
            <VStack
              spacing={2}
              align={{ base: 'center', lg: 'flex-start' }}
              textAlign={'center'}
            >
              <Text casing={'uppercase'} fontWeight={'semibold'}>
                {category === 'reboundsTotal' ? 'Rebounds' : category}
              </Text>
              <Flex
                gap={4}
                width={'full'}
                justify={{
                  base: 'center',
                  lg: 'flex-start'
                }}
              >
                <Card
                  {...getLeaderInfo(boxscore, 'homeTeam', category)}
                  priority={getPriority(category, breakpoint)}
                />
                <Card
                  {...getLeaderInfo(boxscore, 'awayTeam', category)}
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
