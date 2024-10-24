import { useMemo } from 'react'
import { useAccount as useWagmiAccount } from 'wagmi'

import { Web3Wallet } from '@/core/types/web3'
import { getLatestWalletId, shortenAddress } from '@/core/utils'

import { useAddressToDomain } from '../use-domain'
import { useEvmConnect } from './use-connect'

export function useEvmAccount(): Web3Wallet.UseAccountReturnType {
  const { address, isConnected, chainId } = useWagmiAccount()
  const { connectors } = useEvmConnect()
  const { data: ensName } = useAddressToDomain({
    address: address!,
    chainId,
  })

  const wallet = useMemo<Web3Wallet.UserWallet>(() => {
    if (!address) return null

    const connectorId = getLatestWalletId('evm')
    const displayName = !!ensName ? ensName : shortenAddress(address, 4, 4)

    return {
      address: address,
      provider: 'evm',
      connectorId,
      connector: connectors.find((c) => c.id === connectorId),
      displayName: displayName,
      chainId,
    }
  }, [address, chainId, connectors, ensName])

  return { isConnected, chainId, wallet }
}
