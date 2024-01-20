import { BoxscoreTable } from '@/src/components/boxscore-table'
import { getSummary } from '@/src/lib/espn'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

export default async function BoxscorePage({
  params,
}: {
  params: { gameId: string }
}) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['summary', params.gameId],
    queryFn: () => getSummary(params.gameId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-screen-lg">
        <BoxscoreTable gameId={params.gameId} />
      </div>
    </HydrationBoundary>
  )
}
