import { DayPicker, DayPickerProps } from './index'
import { render, screen, fireEvent } from '../../../test-utils'
import { setMedia } from 'mock-match-media'

const mockToday = new Date(2022, 0, 1)

const defaultProps: DayPickerProps = {
  selectedDate: mockToday,
  setSelectedDate: jest.fn()
}

const setup = (props?: Partial<DayPickerProps>) => {
  render(<DayPicker {...defaultProps} {...props} />)

  return {}
}

describe('<DayPicker />', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(mockToday)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('renders the correct dates on `base` or above screens', () => {
    setMedia({ width: '1px' })
    setup()
    expect(screen.queryByText('12/30')).not.toBeInTheDocument()
    expect(screen.queryByText('12/31')).toBeInTheDocument()
    expect(screen.queryByText('01/01')).toBeInTheDocument()
    expect(screen.queryByText('01/02')).toBeInTheDocument()
    expect(screen.queryByText('01/03')).not.toBeInTheDocument()
  })

  it('renders the correct dates on `md` or above screens', () => {
    setMedia({ width: '768px' })
    setup()
    expect(screen.queryByText('12/29')).toBeInTheDocument()
    expect(screen.queryByText('12/30')).toBeInTheDocument()
    expect(screen.queryByText('12/31')).toBeInTheDocument()
    expect(screen.queryByText('01/01')).toBeInTheDocument()
    expect(screen.queryByText('01/02')).toBeInTheDocument()
    expect(screen.queryByText('01/03')).toBeInTheDocument()
    expect(screen.queryByText('01/04')).toBeInTheDocument()
  })

  it('renders the correct dates when moving in the past on `base` screens', () => {
    setMedia({ width: '1px' })
    setup()
    fireEvent.click(screen.getByLabelText('Previous 3 days'))
    expect(screen.queryByText('12/28')).toBeInTheDocument()
    expect(screen.queryByText('12/29')).toBeInTheDocument()
    expect(screen.queryByText('12/30')).toBeInTheDocument()
  })

  it('renders the correct dates when moving in the future on `base` screens', () => {
    setMedia({ width: '1px' })
    setup()
    fireEvent.click(screen.getByLabelText('Next 3 days'))
    expect(screen.queryByText('01/03')).toBeInTheDocument()
    expect(screen.queryByText('01/04')).toBeInTheDocument()
    expect(screen.queryByText('01/05')).toBeInTheDocument()
  })

  it('renders the correct dates when moving in the past on `md` screens', () => {
    setMedia({ width: '768px' })
    setup()
    fireEvent.click(screen.getByLabelText('Previous 7 days'))
    expect(screen.queryByText('12/22')).toBeInTheDocument()
    expect(screen.queryByText('12/23')).toBeInTheDocument()
    expect(screen.queryByText('12/24')).toBeInTheDocument()
    expect(screen.queryByText('12/25')).toBeInTheDocument()
    expect(screen.queryByText('12/26')).toBeInTheDocument()
    expect(screen.queryByText('12/27')).toBeInTheDocument()
    expect(screen.queryByText('12/28')).toBeInTheDocument()
  })

  it('renders the correct dates when moving in the future on `md` screens', () => {
    setMedia({ width: '768px' })
    setup()
    fireEvent.click(screen.getByLabelText('Next 7 days'))
    expect(screen.queryByText('01/05')).toBeInTheDocument()
    expect(screen.queryByText('01/06')).toBeInTheDocument()
    expect(screen.queryByText('01/07')).toBeInTheDocument()
    expect(screen.queryByText('01/08')).toBeInTheDocument()
    expect(screen.queryByText('01/09')).toBeInTheDocument()
    expect(screen.queryByText('01/10')).toBeInTheDocument()
    expect(screen.queryByText('01/11')).toBeInTheDocument()
  })
})
