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
  broadcasts: IScoreboard['games'][number]['watch']['broadcast']['broadcasters']['national']
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
              const info = broadcasters[broadcast.shortName.toLowerCase()]

              return info ? (
                <Button
                  key={`${gameId}-${broadcast.shortName}`}
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
                        alt={broadcast.shortName}
                      />
                      <Text fontWeight={'semibold'}>{broadcast.shortName}</Text>
                    </HStack>
                    <ExternalLinkIcon />
                  </HStack>
                </Button>
              ) : (
                <Text key={`${gameId}-${broadcast.shortName}`}>
                  {broadcast.shortName}
                </Text>
              )
            })}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
