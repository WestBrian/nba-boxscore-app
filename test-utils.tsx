import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as JotaiProvider } from 'jotai'

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <JotaiProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </JotaiProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
