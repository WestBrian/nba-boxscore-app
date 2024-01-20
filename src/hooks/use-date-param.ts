import { useSearchParams } from 'next/navigation'

export function useDateParam() {
  const searchParams = useSearchParams()
  return searchParams.get('date')
    ? new Date(searchParams.get('date') as string)
    : new Date()
}
