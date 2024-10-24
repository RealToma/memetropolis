import { useMemo } from 'react'

import { Web3Wallet } from '@/core/types/web3'
import { getLatestWalletId } from '@/core/utils'

type WalletOptionProps = {
  connector: Web3Wallet.Connector
  isConnecting?: boolean
  onConnectWallet: (connectorId: string, provider: Web3Wallet.Providers) => void
  provider: Web3Wallet.Providers
}

export function WalletOption({
  connector,
  isConnecting,
  onConnectWallet,
  provider,
}: WalletOptionProps) {
  const isLatestId = useMemo(
    () => connector.id === getLatestWalletId(provider),
    [connector.id, provider],
  )

  return (
    <button
      type="button"
      onClick={() => onConnectWallet(connector.id, provider)}
      className="enabled:hover:bg-bg-weak-100 dark:hover:bg-bg-surface-700 flex w-full items-center justify-between gap-3 rounded-lg border border-[#413B48] px-4 py-2 text-start transition-all enabled:hover:border-white enabled:focus-visible:border-white"
      aria-label={`Connect with ${connector.name}`}
    >
      <div className="flex items-center gap-2">
        <span>{connector.name}</span>
        {isConnecting && (
          <span className="text-xs">Connecting to {connector.name}...</span>
        )}
        {!isConnecting && isLatestId && <span className="text-xs">Recent</span>}
      </div>
      <div>
        {isConnecting && (
          <div className="border-state-warning aspect-square size-4 animate-spin rounded-full border-2 border-b-transparent" />
        )}
      </div>
      {connector.icon && (
        <img
          src={connector.icon}
          alt={`${connector.name} icon`}
          className="h-10 w-10"
        />
      )}
    </button>
  )
}
