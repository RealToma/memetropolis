'use client'

import { useCallback, useMemo } from 'react'
import { useConnect as useWagmiConnect } from 'wagmi'

import { Web3Wallet } from '@/core/types/web3'

import { QUERIES, useMediaQuery } from '../use-media-query'
import { walletsConfig } from "@/core/lib/wagmi/wallet";
import { getConnectorIcon } from "@/core/utils/web3";

const DESKTOP_NOT_USED_CONNECTORS = ['metaMask', 'trust']
const MOBILE_NOT_USED_CONNECTORS = ['io.metamask', 'com.trustwallet.app']

export const useEvmConnect = (): Web3Wallet.UseConnectReturnType => {
  const { connectAsync, connectors: wagmiConnectors } = useWagmiConnect()
  const isDesktop = useMediaQuery(QUERIES.DESKTOP)

  const connectors = useMemo<Web3Wallet.Connector[]>(() => {
    const walletsToCheckIfInstalled = walletsConfig()
    const mergedConnectors = wagmiConnectors.filter((c) => {
      const wallet = walletsToCheckIfInstalled.find(
        (w) => w.connectorId === c.id,
      )
      if (wallet) {
        return wallet.installed
      }
      return true
    })

    return (
      mergedConnectors
        .filter((c) =>
          isDesktop
            ? !DESKTOP_NOT_USED_CONNECTORS.includes(c.id)
            : !MOBILE_NOT_USED_CONNECTORS.includes(c.id),
        )
        // filter out connectors with duplicate names
        .filter((c, i, arr) => arr.findIndex((d) => d.name === c.name) === i)
        .map((c) => ({
          id: c.id,
          name: c.name,
          icon: getConnectorIcon(c.id) || c.icon,
          provider: 'evm',
        }))
    )
  }, [isDesktop, wagmiConnectors])

  const connect = useCallback<Web3Wallet.ConnectFunction>(
    async (connectorId: string, chainId?: number) => {
      const connector = wagmiConnectors.find((c) => c.id === connectorId)

      if (!connector) throw new Error('Connector not found')

      await connectAsync({ connector, chainId })
    },
    [connectAsync, wagmiConnectors],
  )

  return {
    connect,
    connectors,
  }
}
