import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'

import { Web3Wallet } from '@/core/types/web3'
import { getLatestWalletId, shortenAddress } from '@/core/utils'

import { useSolanaConnect } from './use-connect'

export function useSolanaAccount(): Web3Wallet.UseAccountReturnType {
  const { publicKey } = useSolanaWallet()
  const { connectors } = useSolanaConnect()

  const wallet = useMemo<Web3Wallet.UserWallet>(() => {
    if (!publicKey) return null

    const connectorId = getLatestWalletId('solana')

    return {
      address: publicKey.toBase58()!,
      provider: 'solana',
      connectorId,
      connector: connectors.find((c) => c.id === connectorId),
      displayName: shortenAddress(publicKey.toBase58()!, 4, 4),
      chainId: 900,
    }
  }, [connectors, publicKey])

  return {
    isConnected: !!publicKey,
    wallet,
  }
}
