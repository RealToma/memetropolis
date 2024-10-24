import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEvmAccount } from '@/core/hooks/evm/use-account'
import { UseCrosschainQuote } from '@/core/types/contract'
import { createTxObject } from '@/core/utils'
import {
  switchUserChain,
  writeContractAndWaitForReceipt,
} from '@/core/utils/wagmi'
import TokenFactoryABI from '@/core/constants/abi/token-factory'
import TokenABI from '@/core/constants/abi/token'
import { TOKEN_FACTORY_ADDRESSES } from '@/core/constants/address'
import { baseSepolia, bscTestnet } from 'wagmi/chains'
import { readContract } from '@wagmi/core'
import { ChainId, wagmiConfig } from '@/core/lib/wagmi'
import { parseEther, formatEther } from 'viem'

export const useCrosschainQuote: UseCrosschainQuote.FunctionType = () => {
  const { wallet } = useEvmAccount()

  return useMutation({
    mutationFn: async ({ data }) => {
      if (!wallet || !wallet.chainId) {
        throw new Error('No wallet found')
      }

      const _chainId = data.chainId

      if (!_chainId) throw new Error('ChainId not defined')

      if (!TOKEN_FACTORY_ADDRESSES[_chainId]) {
        throw new Error('No token factory found')
      }

      const valueWithDecimals = parseEther(data.value)

      if (data.sellBuyFlag == 'buy') {
        if (!data.value) {
          throw new Error('ETH amount is required for buy operations')
        }

        // Quote the cross-chain buy transaction
        const result = await readContract(wagmiConfig, {
          abi: TokenFactoryABI,
          address: TOKEN_FACTORY_ADDRESSES[_chainId] as `0x${string}`,
          functionName: 'getTokenOutOnBuy',
          args: [data.memeTokenAddress, valueWithDecimals],
          chainId: _chainId as ChainId,
        })

        return {
          value: formatEther(BigInt(String(result))),
        }
      } else {
        if (!data.value) {
          throw new Error('ETH amount is required for buy operations')
        }

        // Quote the cross-chain sell transaction
        const result = await readContract(wagmiConfig, {
          abi: TokenFactoryABI,
          address: TOKEN_FACTORY_ADDRESSES[_chainId] as `0x${string}`,
          functionName: 'getEthAmountOnSell',
          args: [data.memeTokenAddress, valueWithDecimals],
          chainId: _chainId as ChainId,
        })

        return {
          value: formatEther(BigInt(String(result))),
        }
      }
    },
  })
}
