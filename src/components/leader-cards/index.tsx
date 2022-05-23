import type { FC } from 'react'
import {
  Box,
  HStack,
  Flex,
  Text,
  AspectRatio,
  useColorMode,
  VStack
} from '@chakra-ui/react'
import type { IBoxscore } from '../../types'
import Image from 'next/image'

const categories = ['points', 'assists', 'rebounds'] as const

interface CardProps {
  name: string
  personId: string
  value: string
}

const Card: FC<CardProps> = ({ name, personId, value }) => {
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
  function getLeaderInfo(
    boxscore: IBoxscore,
    team: 'hTeam' | 'vTeam',
    category: typeof categories[number]
  ) {
    const stats = boxscore.stats

    if (!stats) {
      return {
        name: 'Player',
        personId: '201939',
        value: '0'
      }
    }

    const teamLeaders = stats[team].leaders[category]

    return {
      name: teamLeaders.players[0].lastName,
      personId: teamLeaders.players[0].personId,
      value: teamLeaders.value
    }
  }

  return (
    <Flex gap={4} direction={['column', 'row']} width={'full'}>
      {categories.map((category) => (
        <Box key={category} width={'full'}>
          <VStack spacing={2} align={'flex-start'}>
            <Text casing={'uppercase'} fontWeight={'semibold'}>
              {category}
            </Text>
            <Flex
              gap={2}
              width={'full'}
              justify={['space-between', 'flex-start']}
            >
              <Card {...getLeaderInfo(boxscore, 'hTeam', category)} />
              <Card {...getLeaderInfo(boxscore, 'vTeam', category)} />
            </Flex>
          </VStack>
        </Box>
      ))}
    </Flex>
  )
}
