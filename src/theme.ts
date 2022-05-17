import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  fonts: {
    body: 'Montserrat, sans-serif',
    heading: 'Montserrat, sans-serif'
  }
})

export default theme
