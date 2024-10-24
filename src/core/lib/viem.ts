import { createPublicClient, fallback, http, PublicClient } from 'viem'

import { PUBLIC_NODES, SUPPORT_CHAINS } from "@/core/constants/chains";
import { ChainId } from "@/core/lib/wagmi";

export const CLIENT_CONFIG = {
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
}

function createViemPublicClients({
  transportSignal,
}: { transportSignal?: AbortSignal } = {}) {
  return SUPPORT_CHAINS.reduce(
    (prev, curr) => {
      return {
        ...prev,
        [curr.id]: createPublicClient({
          chain: curr,
          transport: fallback(
            PUBLIC_NODES[curr.id].map((url) =>
              http(url, {
                timeout: 10_000,
                fetchOptions: { signal: transportSignal },
              }),
            ),
            { rank: false },
          ),
        }),
      }
    },
    {} as Record<ChainId, PublicClient>,
  )
}

export const viemClients = createViemPublicClients()

export const publicClient = ({ chainId }: { chainId?: ChainId }) => {
  if (chainId && viemClients[chainId]) {
    return viemClients[chainId]
  }

  const httpString = !!chainId ? PUBLIC_NODES[chainId][0] : undefined

  const chain = SUPPORT_CHAINS.find((c) => c.id === chainId)
  return createPublicClient({
    chain,
    transport: http(httpString),
  })
}
