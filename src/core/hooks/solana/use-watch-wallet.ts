'use client'

import { useWallet as useWalletSolana } from '@solana/wallet-adapter-react'
import { useCallback, useEffect } from 'react'

import { Web3Wallet } from '@/core/types/web3'

export const useWatchWalletSolana = ({
  onChange,
}: Web3Wallet.UseWatchWalletParams) => {
  const { publicKey } = useWalletSolana()
  const _onChange = useCallback(onChange, [onChange])

  useEffect(() => {
    _onChange?.({
      address: publicKey?.toBase58() || undefined,
      provider: 'solana',
    })
  }, [_onChange, publicKey])
}
