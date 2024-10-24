import { baseSepolia, bscTestnet, sepolia } from 'wagmi/chains'

export const SUPPORT_CHAINS = [sepolia, bscTestnet, baseSepolia] as const

export const PUBLIC_NODES: Record<
  (typeof SUPPORT_CHAINS)[number]['id'],
  string[] | readonly string[]
> = {
  [sepolia.id]: sepolia.rpcUrls.default.http,
  [bscTestnet.id]: bscTestnet.rpcUrls.default.http,
  [baseSepolia.id]: baseSepolia.rpcUrls.default.http,
}

export const CHAIN_ID = {
  MAINNET: 1,
  SEPOLIA: 11155111,
  ARBITRUM_ONE: 42161,
  BNB: 56,
  BSC_TESTNET: bscTestnet.id,
  BASE_TESTNET: baseSepolia.id,
  OPBNB: 204,
  AVALANCHE: 43114,
  BASE: 8453,
  BLAST: 81457,
  SOLANA: 900,
  LINEA: 59144,
  FANTOM: 250,
  ZKSYNC: 324,
} as const

export const LAYERZERO_CHAIN_ID_MAP: Record<number, number> = {
  [CHAIN_ID.SEPOLIA]: 40161,
  [CHAIN_ID.BSC_TESTNET]: 40102,
  [CHAIN_ID.BASE_TESTNET]: 40245,
}
