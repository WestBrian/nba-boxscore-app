import { type FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Box
} from '@chakra-ui/react'
import ABCLogo from '../../../public/abc.png'
import TNTLogo from '../../../public/tnt.png'
import ESPNLogo from '../../../public/espn.png'
import Image, { StaticImageData } from 'next/image'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import type { Game, LeagueScheduleResponse } from '../../services/schedule.type'
import useSWR from 'swr'

interface BroadcastMetaInfo {
  image: StaticImageData
  watch: string
  width: number
  height: number
}

const broadcasterData: { [x: string]: BroadcastMetaInfo | undefined } = {
  abc: {
    image: ABCLogo,
    watch: 'https://abc.com/watch-live',
    width: 25,
    height: 25
  },
  tnt: {
    image: TNTLogo,
    watch: 'https://www.tntdrama.com/watchtnt',
    width: 25,
    height: 25
  },
  espn: {
    image: ESPNLogo,
    watch: 'https://www.espn.com/watch/',
    width: 56.25,
    height: 25
  }
}

interface WatchModalProps {
  gameId: string
  isOpen: boolean
  onClose: () => void
}

export const WatchModal: FC<WatchModalProps> = ({
  gameId,
  isOpen,
  onClose
}) => {
  const { data: schedule } = useSWR<LeagueScheduleResponse>('schedule')

  const findGame = (game: Game) => game.gameId === gameId
  const gameDate = schedule?.leagueSchedule.gameDates.find((g) =>
    g.games.find(findGame)
  )
  const game = gameDate?.games.find(findGame)
  const broadcasters = game?.broadcasters
  const broadcasts = broadcasters
    ? [
        ...broadcasters.nationalTvBroadcasters,
        ...broadcasters.homeTvBroadcasters,
        ...broadcasters.awayTvBroadcasters
      ]
    : []

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Broadcasts</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={4}>
          <VStack w={'full'} spacing={4} align={'start'}>
            {broadcasts.map((broadcast) => {
              const info =
                broadcasterData[broadcast.broadcasterAbbreviation.toLowerCase()]

              return info ? (
                <Button
                  key={`${gameId}-${broadcast.broadcasterAbbreviation}`}
                  colorScheme={'purple'}
                  as={'a'}
                  href={info.watch}
                  target={'_blank'}
                >
                  <HStack spacing={4}>
                    <HStack spacing={2}>
                      <Image
                        src={info.image}
                        width={info.width}
                        height={info.height}
                        alt={broadcast.broadcasterAbbreviation}
                      />
                      <Text fontWeight={'semibold'} letterSpacing={'wider'}>
                        {broadcast.broadcasterAbbreviation}
                      </Text>
                    </HStack>
                    <ExternalLinkIcon />
                  </HStack>
                </Button>
              ) : (
                <Box key={`${gameId}-${broadcast.broadcasterAbbreviation}`}>
                  <Text fontWeight={'semibold'} letterSpacing={'wider'}>
                    {broadcast.broadcasterDisplay}
                  </Text>
                  {broadcast.broadcasterScope !== 'natl' && (
                    <Text fontSize={'xs'}>{broadcast.broadcasterScope}</Text>
                  )}
                </Box>
              )
            })}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
