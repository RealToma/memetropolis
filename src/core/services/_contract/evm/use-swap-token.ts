import { useMutation } from '@tanstack/react-query'
import { useEvmAccount } from '@/core/hooks/evm/use-account'
import { UseSwapToken } from '@/core/types/contract'
import { createTxObject } from '@/core/utils'
import {
  switchUserChain,
  writeContractAndWaitForReceipt,
} from '@/core/utils/wagmi'
import TokenFactoryABI from '@/core/constants/abi/token-factory'
import TokenABI from '@/core/constants/abi/token'
import { TOKEN_FACTORY_ADDRESSES } from '@/core/constants/address'
import { readContract } from '@wagmi/core'
import { ChainId, wagmiConfig } from '@/core/lib/wagmi'
import { parseEther } from 'viem'

export const useSwapToken: UseSwapToken.FunctionType = () => {
  const { wallet } = useEvmAccount()

  return useMutation({
    mutationFn: async ({ data }) => {
      if (!wallet || !wallet.chainId) {
        throw new Error('No wallet found')
      }

      const _chainId = data.chainId
      await switchUserChain({ account: wallet.address, chainId: _chainId })

      if (!TOKEN_FACTORY_ADDRESSES[_chainId]) {
        throw new Error('No token factory found')
      }

      const tokenQtyWithDecimals = parseEther(data.tokenQty.toString())

      if (data.sellBuyFlag == 'buy') {
        const requiredEth = await readContract(wagmiConfig, {
          abi: TokenFactoryABI,
          address: TOKEN_FACTORY_ADDRESSES[_chainId] as `0x${string}`,
          functionName: 'getRequiredEth',
          args: [data.tokenAddress, tokenQtyWithDecimals],
          chainId: _chainId as ChainId,
        })

        const { hash: hash2, receipt } = await writeContractAndWaitForReceipt({
          abi: TokenFactoryABI,
          address: TOKEN_FACTORY_ADDRESSES[_chainId],
          functionName: 'buyMemeToken',
          args: [data.tokenAddress, tokenQtyWithDecimals],
          chainId: _chainId,
          value: BigInt(String(requiredEth)), // Pass the required ETH amount
        })

        return {
          ...createTxObject({ tx: { hash: hash2 }, chainId: _chainId }),
          result: 1,
        }
      } else if (data.sellBuyFlag == 'sell') {
        // Check balance before proceeding
        const balance = await readContract(wagmiConfig, {
          abi: TokenABI,
          address: data.tokenAddress as `0x${string}`,
          functionName: 'balanceOf',
          args: [wallet.address],
          chainId: _chainId as ChainId,
        })

        // Convert balance to BigInt
        const balanceBigInt = BigInt(balance as string)

        if (balanceBigInt < tokenQtyWithDecimals) {
          throw new Error('Not enough balance')
        }

        // If enough balance, approve
        const { hash: approvalHash } = await writeContractAndWaitForReceipt({
          abi: TokenABI,
          address: data.tokenAddress,
          functionName: 'approve',
          args: [TOKEN_FACTORY_ADDRESSES[_chainId], tokenQtyWithDecimals],
          chainId: _chainId,
        })

        const { hash, receipt } = await writeContractAndWaitForReceipt({
          abi: TokenFactoryABI,
          address: TOKEN_FACTORY_ADDRESSES[_chainId],
          functionName: 'sellMemeToken',
          args: [data.tokenAddress, tokenQtyWithDecimals],
          chainId: _chainId,
        })

        return {
          ...createTxObject({ tx: { hash }, chainId: _chainId }),
          result: 1,
        }
      } else {
        // In case of buyInETH
        // Calculate the token output for the given ETH amount
        const tokenOut = await readContract(wagmiConfig, {
          abi: TokenFactoryABI,
          address: TOKEN_FACTORY_ADDRESSES[_chainId] as `0x${string}`,
          functionName: 'getTokenOutOnBuy',
          args: [data.tokenAddress, tokenQtyWithDecimals],
          chainId: _chainId as ChainId,
        })

        // Execute the buyMemeTokenInEth function
        const { hash, receipt } = await writeContractAndWaitForReceipt({
          abi: TokenFactoryABI,
          address: TOKEN_FACTORY_ADDRESSES[_chainId],
          functionName: 'buyMemeTokenInEth',
          args: [data.tokenAddress, tokenOut], // Use tokenQtyWithDecimals as tokenQtyMin
          chainId: _chainId,
          value: tokenQtyWithDecimals, // Pass the required ETH amount
        })

        return {
          ...createTxObject({ tx: { hash }, chainId: _chainId }),
          result: 1,
        }
      }
    },
  })
}
