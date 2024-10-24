import { queryOptions } from '@tanstack/react-query'
import { api } from '@/core/lib/axios'
import { RecentToken } from '@/core/types/recentToken'
import { Trader } from '@/core/types/trader'

export function getAccountRecentTokens(walletAddress: string) {
  return queryOptions({
    queryKey: ['GET_ACCOUNT_RECENT_TOKENS'],
    queryFn: async (): Promise<RecentToken[]> => {
      const response = await api.get(
        `/account/recent-tokens?walletAddress=${walletAddress}`,
      )
      return response.data.recentTokens
    },
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function getAccountTopTraders() {
  return queryOptions({
    queryKey: ['GET_ACCOUNT_TOP_TRADERS'],
    queryFn: async (): Promise<Trader[]> => {
      const response = await api.get(`/account/top-traders`)
      return response.data.traders
    },
    staleTime: 5 * 60 * 1000, // 5 min
  })
}
