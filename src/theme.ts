import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Manrope, Roboto_Mono } from 'next/font/google'

const teamColors = {
  ATL: '#e03a3e',
  BKN: '#000',
  BOS: '#008348',
  CHA: '#00788c',
  CHI: '#ce1141',
  CLE: '#6f263d',
  DAL: '#0053bc',
  DEN: '#0e2240',
  DET: '#1d428a',
  GSW: '#006bb6',
  HOU: '#ce1141',
  IND: '#002d62',
  LAC: '#c8102e',
  LAL: '#552583',
  MEM: '#5d76a9',
  MIA: '#98002e',
  MIL: '#00471b',
  MIN: '#0c2340',
  NOP: '#002b5c',
  NYK: '#006bb6',
  OKC: '#007ac1',
  ORL: '#0077c0',
  PHI: '#006bb6',
  PHX: '#1d1160',
  POR: '#e03a3e',
  SAC: '#5a2d81',
  SAS: '#000',
  TOR: '#000',
  UTA: '#002b5c',
  WAS: '#002b5c'
}

const manrope = Manrope({
  weight: ['400', '700', '800'],
  subsets: ['latin']
})

const robotoMono = Roboto_Mono({
  subsets: ['latin']
})

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  fonts: {
    body: manrope.style.fontFamily,
    heading: manrope.style.fontFamily,
    mono: robotoMono.style.fontFamily
  },
  colors: {
    ...teamColors
  }
})

export default theme
