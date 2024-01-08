export function gamePeriodToString(period: number) {
  switch (period) {
    case 1:
      return '1st'
    case 2:
      return '2nd'
    case 3:
      return '3rd'
    case 4:
      return '4th'
    case 5:
      return 'OT'
    default:
      return ''
  }
}
