import { SUPPORT_CHAINS } from "@/core/constants/chains";
import { Web3Wallet } from "@/core/types/web3";

export function getChainLogo(chainId?: number) {
  if (!chainId) return ''

  const LOGO = {
    1: '/assets/img/chains/ethereum.svg',
    5: '/assets/img/chains/ethereum.svg',
    11155111: '/assets/img/chains/ethereum.svg',
    8453: '/assets/img/chains/base.svg',
    84532: '/assets/img/chains/base.svg',
    137: '/assets/img/chains/polygon.svg',
    56: '/assets/img/chains/bsc.svg',
    97: '/assets/img/chains/bsc.svg',
    204: '/assets/img/chains/bsc.svg',
    42161: '/assets/img/chains/arbitrum.svg',
    81457: '/assets/img/chains/blast.png',
    999: '/assets/img/chains/solana.svg',
    43114: '/assets/img/chains/avalanche.svg',
    59144:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/linea/info/logo.png',
    250: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/fantom/info/logo.png',
    324: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/zksync/info/logo.png',
  }[chainId]

  return LOGO ?? ''
}

export function getChainShortName(chainId?: number) {
  if (!chainId) return ''

  const CHAIN_NAME = {
    1: 'ETH',
    5: 'ETH',
    11155111: 'ETH',
    8453: 'BASE',
    84532: 'BASE',
    56: 'BNB',
    97: 'BNB',
    204: 'BNB',
    42161: 'ARBITRUM',
    81457: 'BLAST',
    43114: 'AVALANCHE',
    59144: 'LINEA',
    250: 'FANTOM',
  }[chainId]

  return CHAIN_NAME ?? ''
}

type ShortenAddress = (
  address: string,
  length?: number,
  rightLength?: number,
) => string

const LATEST_STORAGE_KEY = 'memetropolis-lastest-id'

export const shortenAddress: ShortenAddress = (
  address,
  length = 6,
  rightLength = length,
) =>
  [
    address.slice(0, length),
    rightLength > 0 ? address.slice(rightLength * -1) : '',
  ].join('...')

export function getChainById(id: number) {
  return SUPPORT_CHAINS.find((chain) => chain.id === id)
}

export function createTxObject({
 tx,
 chainId,
}: {
  tx: { hash: string }
  chainId: number
}) {
  const chain = getChainById(chainId)

  return {
    transactionHash: tx.hash,
    transactionUrl: new URL(
      `/tx/${tx.hash}`,
      chain?.blockExplorers?.default.url ?? '',
    ).toString(),
  }
}

export function createSolanaTxObject({
  tx
}: {
  tx: { hash: string }
}) {
  return {
    transactionHash: tx.hash,
    transactionUrl: new URL(
      `/tx/${tx.hash}`,
      'https://solscan.io',
    ).toString(),
  }
}

export function getConnectorIcon(id: string): string | undefined {
  return {
    // EVM
    ['io.metamask']: '/assets/wallets/metamask.svg',
    metaMask: '/assets/wallets/metamask.svg',
    metaMaskSDK: '/assets/wallets/metamask.svg',
    coinbaseWalletSDK: '/assets/wallets/coinbase.svg',
    walletConnect: '/assets/wallets/walletconnect.svg',
    'app.phantom': '/assets/wallets/phantom.svg',

    // Solana
    trust: '/assets/wallets/trustwallet.svg',
  }[id]
}

export function getLatestWalletId(
  provider: Web3Wallet.Providers = 'evm',
): string {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem(`${LATEST_STORAGE_KEY}-${provider}`) || ''
    : ''
}

export function addLatestWalletId(
  provider: Web3Wallet.Providers = 'evm',
  walletId: string,
): void {
  localStorage.setItem(`${LATEST_STORAGE_KEY}-${provider}`, walletId)
}

export function removeLatestWalletId(
  provider: Web3Wallet.Providers = 'evm',
): void {
  localStorage.removeItem(`${LATEST_STORAGE_KEY}-${provider}`)
}

type SortAndKeepLatestConnectorFirstParams = {
  connectors: Web3Wallet.Connector[]
  recommendedConnectors?: string[]
  provider?: Web3Wallet.Providers
}

export function sortAndKeepLatestConnectorFirst({
  connectors,
  provider,
  recommendedConnectors,
}: SortAndKeepLatestConnectorFirstParams) {
  const latestConnector = getLatestWalletId(provider)

  let newConnectors = connectors

  if (!!recommendedConnectors) {
    newConnectors = newConnectors.sort((a, b) => {
      if (recommendedConnectors.includes(a.id)) return -1
      if (recommendedConnectors.includes(b.id)) return 1
      return 0
    })
  }

  if (!!latestConnector) {
    newConnectors.sort((a, b) => {
      if (a.id === latestConnector) return -1
      if (b.id === latestConnector) return 1
      return 0
    })
  }

  return newConnectors
}