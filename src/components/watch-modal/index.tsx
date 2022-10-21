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
  Button
} from '@chakra-ui/react'
import { IScoreboard } from '../../types'
import ABCLogo from '../../../public/abc.png'
import TNTLogo from '../../../public/tnt.png'
import ESPNLogo from '../../../public/espn.png'
import Image, { StaticImageData } from 'next/image'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import type { LeagueScheduleResponse } from '../../services/leagueSchedule.types'

interface BroadcastMetaInfo {
  image: StaticImageData
  watch: string
  width: number
  height: number
}

const broadcasters: { [x: string]: BroadcastMetaInfo | undefined } = {
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
  broadcasts: LeagueScheduleResponse['leagueSchedule']['gameDates'][number]['games'][number]['broadcasters']['nationalTvBroadcasters']
  onClose: () => void
}

export const WatchModal: FC<WatchModalProps> = ({
  gameId,
  isOpen,
  broadcasts,
  onClose
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Broadcasts</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={4}>
          <VStack spacing={4}>
            {broadcasts.map((broadcast) => {
              const info =
                broadcasters[broadcast.broadcasterAbbreviation.toLowerCase()]

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
                      <Text fontWeight={'semibold'}>
                        {broadcast.broadcasterAbbreviation}
                      </Text>
                    </HStack>
                    <ExternalLinkIcon />
                  </HStack>
                </Button>
              ) : (
                <Text key={`${gameId}-${broadcast.broadcasterAbbreviation}`}>
                  {broadcast.broadcasterAbbreviation}
                </Text>
              )
            })}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
