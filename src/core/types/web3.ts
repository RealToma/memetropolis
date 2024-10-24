export namespace Web3Wallet {
  export type Providers = 'evm' | 'solana'

  export type Connector = {
    id: string
    name: string
    icon?: string
    provider: Providers
  }

  export type ProviderConnectors = {
    provider: Providers
    connectors: Connector[]
  }

  export type ConnectFunction = (
    connectorId: string,
    chainId?: number,
  ) => Promise<void>

  export type UserWallet = {
    address: string
    provider: Providers
    connectorId: string
    displayName: string
    connector?: Connector
    chainId?: number
  } | null

  export type SignMessageFunction = (message: string) => Promise<string>

  export type DisconnectFunction = () => Promise<void>

  export type WatchWalletFunction = (params: {
    address?: string
    provider: Providers
    chainId?: number
  }) => void

  export type UseConnectReturnType = {
    connect: ConnectFunction
    connectors: Connector[]
  }

  export type UseSignMessageReturnType = {
    signMessage: SignMessageFunction
  }

  export type UseDisconnectReturnType = {
    disconnect: DisconnectFunction
  }

  export type UseAccountReturnType = {
    wallet: UserWallet
    chainId?: number
    isConnected: boolean
  }

  export type UseWatchWalletParams = {
    onChange: WatchWalletFunction
  }

  export declare function OrchestratorReturnFunc<
    T extends (...args: any[]) => any,
  >(provider: Providers, ...args: Parameters<T>): ReturnType<T>

  export type UseWalletHookReturnType = {
    address?: string
    wallets: NonNullable<UserWallet>[]
    chainId?: number
    isConnected: boolean
    connect: typeof OrchestratorReturnFunc<ConnectFunction>
    disconnect: typeof OrchestratorReturnFunc<DisconnectFunction>
    signMessage: typeof OrchestratorReturnFunc<SignMessageFunction>
    connectors: ProviderConnectors[]
    getWallet: (provider: Providers) => UserWallet
  }
}
