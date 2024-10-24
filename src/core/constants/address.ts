import { mainnet, sepolia, bscTestnet, baseSepolia } from 'wagmi/chains'

export const TOKEN_FACTORY_ADDRESSES: { [chainId: number]: string } = {
  [bscTestnet.id]: '0x0519127e3674cdf0407b9263a725de7d7e28fb0b',
  [baseSepolia.id]: '0x971d4483f3dccf34c534bc9acea2d265b1fa1c67',
}

export const CHAINLINK_ETH_USD_FEED: { [chainId: number]: string } = {
  [mainnet.id]: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  [sepolia.id]: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
  [bscTestnet.id]: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
}
