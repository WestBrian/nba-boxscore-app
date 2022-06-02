export function percentage(partial: string | number, total: string | number) {
  if (typeof partial === 'string') {
    partial = Number(partial)
  }

  if (typeof total === 'string') {
    total = Number(total)
  }

  return Math.round((100 * partial) / total)
}
