import { queryOptions } from '@tanstack/react-query'
import { Token } from '@/core/types/token'
import { api } from '@/core/lib/axios'

export function getTokenByAddress(address: string) {
  return queryOptions({
    queryKey: ['GET_TOKEN_BY_ADDRESS'],
    queryFn: async (): Promise<Token> => {
      const response = await api.get(`/token/${address}`)
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function getTokenList() {
  return queryOptions({
    queryKey: ['GET_TOKEN_LIST'],
    queryFn: async (): Promise<Token[]> => {
      const response = await api.get(`/token/list`)
      return response.data.tokens
    },
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function getTokenListByCategory(category: string) {
  return queryOptions({
    queryKey: ['GET_TOKEN_LIST_BY_CATEGORY', category],
    queryFn: async (): Promise<Token[]> => {
      const response = await api.get(`/token/list/${category}`)
      return response.data.tokens
    },
    staleTime: 5 * 60 * 1000, // 5 min
  })
}
