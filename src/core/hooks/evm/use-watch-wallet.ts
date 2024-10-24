'use client'

import { watchAccount } from '@wagmi/core'
import { useEffect } from 'react'
import { useConfig as useWagmiConfig } from 'wagmi'

import { Web3Wallet } from '@/core/types/web3'

export const useWatchWalletEvm = ({
  onChange,
}: Web3Wallet.UseWatchWalletParams) => {
  const config = useWagmiConfig()

  useEffect(() => {
    const unwatch = watchAccount(config, {
      onChange(account) {
        onChange?.({
          address: account.address,
          provider: 'evm',
          chainId: account.chainId,
        })
      },
    })

    return () => {
      unwatch()
    }
  }, [config, onChange])
}
