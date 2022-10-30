import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  fonts: {
    body: "'Roboto Mono', sans-serif",
    heading: "'Roboto Mono', sans-serif"
  }
})

export default theme
