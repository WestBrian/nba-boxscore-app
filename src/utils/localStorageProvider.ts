import { useRef, useEffect } from 'react'
import { State } from 'swr'

export function useCacheProvider() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache = useRef<Map<string, State<any, any>>>(new Map())

  useEffect(() => {
    const appCache = localStorage.getItem('app-cache')
    if (appCache) {
      const map = new Map(
        JSON.parse(appCache) as Iterable<[string, State<any, any>]>
      )
      map.forEach((value, key) => cache.current.set(key, value))
    }

    const saveCache = () => {
      const appCache = JSON.stringify(Array.from(cache.current.entries()))
      localStorage.setItem('app-cache', appCache)
    }

    window.addEventListener('beforeunload', saveCache)
    return () => window.removeEventListener('beforeunload', saveCache)
  }, [])

  return () => cache.current
}
