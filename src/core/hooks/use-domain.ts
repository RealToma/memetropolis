'use client'
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'
import { createWeb3Name } from '@web3-name-sdk/core'

import { useQueryChain } from './use-query-chain'

const web3name = createWeb3Name()

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    string | null,
    Error,
    string | null,
    (string | number)[]
  >,
  'queryKey' | 'queryFn'
>
interface UseAddressToDomainParams extends QueryOptions {
  address: string
  chainId?: number
}
export const useAddressToDomain = (params: UseAddressToDomainParams) => {
  const [currentChainId] = useQueryChain()
  const resolvedChainId = params.chainId ?? currentChainId

  return useQuery({
    queryKey: ['ADDRESS_TO_DOMAIN', resolvedChainId, params.address],
    queryFn: async () => {
      return web3name.getDomainName({
        address: params.address,
        queryChainIdList: [resolvedChainId],
      })
    },
    gcTime: Infinity,
    ...params,
  })
}

interface UseDomainToAddressParams extends QueryOptions {
  domain: string
}

export const useDomainToAddress = (params: UseDomainToAddressParams) => {
  return useQuery({
    queryKey: ['DOMAIN_TO_ADDRESS', params.domain],
    queryFn: async () => {
      return web3name.getAddress(params.domain)
    },
    gcTime: Infinity,
    ...params,
  })
}
