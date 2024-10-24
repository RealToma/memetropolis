import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEvmAccount } from '@/core/hooks/evm/use-account'
import { UseCreateToken } from '@/core/types/contract'
import { createTxObject } from '@/core/utils'
import {
  switchUserChain,
  writeContractAndWaitForReceipt,
} from '@/core/utils/wagmi'
import TokenFactoryABI from '@/core/constants/abi/token-factory'
import { TOKEN_FACTORY_ADDRESSES } from '@/core/constants/address'
import { bscTestnet } from 'wagmi/chains'
import { ChainId } from "@/core/lib/wagmi";

export const useCreateToken: UseCreateToken.FunctionType = () => {
  const { wallet } = useEvmAccount()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data }) => {
      if (!wallet || !wallet.chainId) {
        throw new Error('No wallet found')
      }

      const _chainId = Number(data.chain) as ChainId
      await switchUserChain({ account: wallet.address, chainId: _chainId })

      if (!TOKEN_FACTORY_ADDRESSES[_chainId]) {
        throw new Error('No token factory found')
      }

      const { hash, receipt } = await writeContractAndWaitForReceipt({
        abi: TokenFactoryABI,
        address: TOKEN_FACTORY_ADDRESSES[_chainId],
        functionName: 'createMemeToken',
        args: [data.name, data.symbol, data.image, data.description],
        chainId: _chainId,
      })

      return {
        ...createTxObject({ tx: { hash }, chainId: _chainId }),
        owner: wallet.address,
      }
    },
  })
}
