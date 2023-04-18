import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import theme from '../src/theme'
import { Navbar } from '../src/components/Navbar'
import { Provider as JotaiProvider } from 'jotai'
import { ScheduleBar } from '../src/components/ScheduleBar'
import { SWRConfig } from 'swr'
import useMeasure from 'react-use-measure'
import { useCacheProvider } from '../src/utils/localStorageProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const [ref, bounds] = useMeasure()
  const provider = useCacheProvider()

  return (
    <SWRConfig value={{ provider }}>
      <JotaiProvider>
        <ChakraProvider theme={theme}>
          <Box
            ref={ref}
            w={'full'}
            position={'fixed'}
            shadow={'md'}
            top={0}
            left={0}
            zIndex={'sticky'}
          >
            <Navbar />
            <ScheduleBar />
          </Box>
          <Container
            maxW={'container.lg'}
            mt={bounds.height ? `${bounds.height}px` : '216px'}
          >
            <Component {...pageProps} />
          </Container>
        </ChakraProvider>
      </JotaiProvider>
    </SWRConfig>
  )
}

export default MyApp
