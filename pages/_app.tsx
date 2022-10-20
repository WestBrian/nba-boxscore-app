import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../src/theme'
import { Navbar } from '../src/components/navbar'
import { Provider as JotaiProvider } from 'jotai'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </JotaiProvider>
  )
}

export default MyApp
