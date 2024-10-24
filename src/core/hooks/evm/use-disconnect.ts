import { useCallback } from 'react'
import { useDisconnect as useWagmiDisconnect } from 'wagmi'

import { Web3Wallet } from '@/core/types/web3'

export function useEvmDisconnect(): Web3Wallet.UseDisconnectReturnType {
  const { disconnectAsync } = useWagmiDisconnect()

  const disconnect = useCallback<Web3Wallet.DisconnectFunction>(async () => {
    await disconnectAsync()
  }, [disconnectAsync])

  return { disconnect }
}
