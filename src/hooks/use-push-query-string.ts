import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface PushQueryStringOptions {
  keepExisting?: boolean
}

export function usePushQueryString() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string, options?: PushQueryStringOptions) => {
      const params = options?.keepExisting
        ? new URLSearchParams(searchParams)
        : new URLSearchParams()
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const pushQueryString = useCallback(
    (name: string, value: string, options?: PushQueryStringOptions) => {
      const queryString = createQueryString(name, value, options)

      router.push(pathname + '?' + queryString)
    },
    [createQueryString, pathname, router],
  )

  return {
    pushQueryString,
  }
}
