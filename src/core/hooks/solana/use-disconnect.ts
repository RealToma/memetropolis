import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useCallback } from 'react'

import { Web3Wallet } from '@/core/types/web3'

export function useSolanaDisconnect(): Web3Wallet.UseDisconnectReturnType {
  const { disconnect: disconnectSolana } = useSolanaWallet()

  const disconnect = useCallback<Web3Wallet.DisconnectFunction>(async () => {
    await disconnectSolana()
  }, [disconnectSolana])

  return { disconnect }
}
