import {
  type FC,
  type ReactNode,
  useState,
  useRef,
  useContext,
  useEffect,
  createContext
} from 'react'
import { useDimensions, Table, type TableProps } from '@chakra-ui/react'
import noop from 'lodash/noop'

interface AutoSizeTableContextValue {
  width: number
  setWidth: (width: number) => void
}

const AutoSizeTableContext = createContext<AutoSizeTableContextValue>({
  width: 0,
  setWidth: noop
})

const useAutoSizeTableContext = () => useContext(AutoSizeTableContext)

export interface AutoSizeTableProviderProps {
  children: ReactNode
}

export const AutoSizeTableProvider: FC<AutoSizeTableProviderProps> = ({
  children
}) => {
  const [width, _setWidth] = useState(0)

  function setWidth(width: number) {
    _setWidth((oldWidth) => Math.max(oldWidth, width))
  }

  return (
    <AutoSizeTableContext.Provider value={{ width, setWidth }}>
      {children}
    </AutoSizeTableContext.Provider>
  )
}

export interface AutoSizeTableProps extends TableProps {
  children: ReactNode
}

export const AutoSizeTable: FC<AutoSizeTableProps> = ({
  children,
  ...tableProps
}) => {
  const ref = useRef<HTMLTableElement>(null)
  const dimensions = useDimensions(ref)
  const { width, setWidth } = useAutoSizeTableContext()
  const _width = dimensions?.contentBox.width

  useEffect(() => {
    if (_width) {
      setWidth(_width)
    }
  }, [_width, setWidth])

  return (
    <Table width={['full', width]} {...tableProps} ref={ref}>
      {children}
    </Table>
  )
}
