'use client'

import { useCallback, useMemo } from 'react'

import { Web3Wallet } from '../types/web3'
import { orchestrator } from '../utils/orchestrator'
import { useEvmAccount } from './evm/use-account'
import { useEvmConnect } from './evm/use-connect'
import { useEvmDisconnect } from './evm/use-disconnect'
import { useEvmSignMessage } from './evm/use-sign-message'
import { useSolanaAccount } from './solana/use-account'
import { useSolanaConnect } from './solana/use-connect'
import { useSolanaDisconnect } from './solana/use-disconnect'
import { useSolanaSignMessage } from './solana/use-sign-message'
import { CHAIN_ID } from "@/core/constants/chains";

export const useWallet = (): Web3Wallet.UseWalletHookReturnType => {
  const {
    chainId,
    isConnected: isEvmConnected,
    wallet: evmWallet,
  } = useEvmAccount()
  const { connect: connectEVM, connectors: evmConnectors } = useEvmConnect()
  const { disconnect: disconnectEVM } = useEvmDisconnect()
  const { signMessage: signEvmMessage } = useEvmSignMessage()

  const { isConnected: isSolanaConnected, wallet: solanaWallet } =
    useSolanaAccount()
  const { connect: connectSolana, connectors: solanaConnectors } =
    useSolanaConnect()
  const { disconnect: disconnectSolana } = useSolanaDisconnect()
  const { signMessage: signSolanaMessage } = useSolanaSignMessage()

  const address = useMemo(
    () => evmWallet?.address || solanaWallet?.address,
    [evmWallet, solanaWallet],
  )

  const wallets = useMemo(
    () =>
      [evmWallet, solanaWallet].filter(
        (w) => w !== null,
      ) as NonNullable<Web3Wallet.UserWallet>[],
    [evmWallet, solanaWallet],
  )

  const getWallet = useCallback(
    (provider: Web3Wallet.Providers) => {
      switch (provider) {
        case 'evm':
          return evmWallet
        case 'solana':
          return solanaWallet
      }
    },
    [evmWallet, solanaWallet],
  )

  const isConnected = useMemo(
    () => isEvmConnected || isSolanaConnected,
    [isEvmConnected, isSolanaConnected],
  )

  const connectors = useMemo<Web3Wallet.UseWalletHookReturnType['connectors']>(
    () =>
      [...evmConnectors, ...solanaConnectors].reduce<
        Web3Wallet.UseWalletHookReturnType['connectors']
      >((acc, curr) => {
        const existing = acc.find((c) => c.provider === curr.provider)
        if (existing) {
          existing.connectors.push(curr)
        } else {
          acc.push({ provider: curr.provider, connectors: [curr] })
        }

        return acc
      }, []),
    [evmConnectors, solanaConnectors],
  )

  const connect = orchestrator({ solana: connectSolana, evm: connectEVM })

  const disconnect = orchestrator({
    solana: disconnectSolana,
    evm: disconnectEVM,
  })

  const signMessage = orchestrator({
    solana: signSolanaMessage,
    evm: signEvmMessage,
  })

  return {
    address,
    chainId: isSolanaConnected ? CHAIN_ID.SOLANA : chainId,
    connect,
    connectors,
    disconnect,
    isConnected,
    signMessage,
    wallets,
    getWallet,
  }
}
