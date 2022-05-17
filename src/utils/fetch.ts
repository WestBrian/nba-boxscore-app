export async function customFetch<T = any>(path: string): Promise<T> {
  const res = await fetch(path)
  return await res.json()
}
