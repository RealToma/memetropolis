'use client'

import { useCallback, useMemo, useState } from 'react'

import { useWallet } from '@/core/hooks/use-wallet'
import { Web3Wallet } from '@/core/types/web3'
import {
  addLatestWalletId,
  getLatestWalletId,
  removeLatestWalletId,
  sortAndKeepLatestConnectorFirst,
} from '@/core/utils'

import { useConnectWalletModalState } from '.'

const RECOMMENDED_CONNECTORS: Record<Web3Wallet.Providers, string[]> = {
  evm: ['io.metamask', 'coinbaseWalletSDK', 'walletConnect'],
  solana: ['trust', 'phantom'],
}

type UseConnectWalletReturnType = {
  activeTab: Web3Wallet.Providers
  setActiveTab: (tab: Web3Wallet.Providers) => void
  connectingWith?: string
  connectors: Web3Wallet.ProviderConnectors[]
  handleConnectWallet: (
    connectorId: string,
    network: Web3Wallet.Providers,
  ) => Promise<void>
}

export function useConnectWallet(): UseConnectWalletReturnType {
  const { connect, connectors: _connectors, disconnect } = useWallet()
  const { onOpenChange, desiredChain, setDesiredChain } =
    useConnectWalletModalState()

  const [connectingWith, setConnectingWith] = useState<string>()
  const [activeTab, setActiveTab] = useState<Web3Wallet.Providers>('evm')

  const connectors = useMemo<Web3Wallet.ProviderConnectors[]>(
    () =>
      _connectors.map((c) => ({
        ...c,
        connectors: sortAndKeepLatestConnectorFirst({
          ...c,
          recommendedConnectors: RECOMMENDED_CONNECTORS[c.provider],
        }),
      })),
    [_connectors],
  )

  const handleConnectWallet = useCallback(
    async (connectorId: string, network: Web3Wallet.Providers) => {
      try {
        await disconnect(network)
        setConnectingWith(connectorId)
        await connect(network, connectorId, desiredChain)
        addLatestWalletId(network, connectorId)
        onOpenChange(false)
        setDesiredChain(undefined)
      } catch (error) {
        if (getLatestWalletId(network) === connectorId) {
          removeLatestWalletId(network)
        }
      } finally {
        setConnectingWith(undefined)
      }
    },
    [connect, desiredChain, disconnect, onOpenChange, setDesiredChain],
  )

  return {
    activeTab,
    setActiveTab,
    connectingWith,
    connectors,
    handleConnectWallet,
  }
}
