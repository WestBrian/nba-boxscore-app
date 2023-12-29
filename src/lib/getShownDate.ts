import { UTCDateMini } from '@date-fns/utc'
import { isBefore, subDays } from 'date-fns'

export function getShownDate() {
  return isBefore(new UTCDateMini(), new UTCDateMini().setHours(11))
    ? subDays(new UTCDateMini(), 1)
    : new UTCDateMini()
}
