import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useCallback, useMemo } from 'react'

import { Web3Wallet } from '@/core/types/web3'
import { getConnectorIcon } from '@/core/utils'

export function useSolanaConnect(): Web3Wallet.UseConnectReturnType {
  const { select, wallets } = useSolanaWallet()

  const connectors = useMemo<Web3Wallet.Connector[]>(
    () =>
      wallets.map((w) => ({
        id: w.adapter.name.toLowerCase(),
        name: w.adapter.name,
        icon: getConnectorIcon(w.adapter.name.toLowerCase()) || w.adapter.icon,
        provider: 'solana',
      })),
    [wallets],
  )

  const connect = useCallback<Web3Wallet.ConnectFunction>(
    async (connectorId: string) => {
      const connector = wallets.find(
        (c) => c.adapter.name.toLowerCase() === connectorId,
      )

      if (!connector) throw new Error('Connector not found')

      return select(connector.adapter.name)
    },
    [select, wallets],
  )

  return {
    connect,
    connectors,
  }
}
