import { useCallback } from 'react'
import { useSignMessage } from 'wagmi'

import { Web3Wallet } from '@/core/types/web3'

export const useEvmSignMessage = () => {
  const { signMessageAsync } = useSignMessage()

  const signMessage = useCallback<Web3Wallet.SignMessageFunction>(
    async (message: string) => {
      const signature = await signMessageAsync({ message })

      return signature
    },
    [signMessageAsync],
  )

  return {
    signMessage,
  }
}
