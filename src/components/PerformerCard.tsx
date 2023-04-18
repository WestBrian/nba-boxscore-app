import type { FC } from 'react'
import type { BoxscoreResponse } from '../services/boxscore.type'
import { AspectRatio, Box, Text } from '@chakra-ui/react'
import Image from 'next/image'

type Player = BoxscoreResponse['game']['homeTeam']['players'][number]
type Category =
  keyof BoxscoreResponse['game']['homeTeam']['players'][number]['statistics']

function categoryDisplay(category: Category) {
  switch (category) {
    case 'points':
      return 'PTS'
    case 'assists':
      return 'AST'
    case 'reboundsTotal':
      return 'REB'
    default:
      return category
  }
}

export interface PerformerCardProps {
  player: Player & { team: string }
  category: Category
}

export const PerformerCard: FC<PerformerCardProps> = ({ player, category }) => {
  return (
    <Box minW={'216px'} w={'216px'} position={'relative'}>
      <Box
        bg={player.team}
        w={'full'}
        h={'80%'}
        position={'absolute'}
        roundedTop={'lg'}
        bottom={4}
        zIndex={-1}
      />
      <AspectRatio ratio={1040 / 760}>
        <Image
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.personId}.png`}
          alt={player.familyName}
          fill
        />
      </AspectRatio>
      <Box bg={'gray.900'} px={4} py={2} roundedBottom={'lg'}>
        <Text fontWeight={'semibold'}>
          {player.statistics[category]}{' '}
          <Box as={'span'} color={'gray.400'}>
            {categoryDisplay(category)}
          </Box>
        </Text>
        <Text>
          {player.firstName} {player.familyName}
        </Text>
      </Box>
    </Box>
  )
}
