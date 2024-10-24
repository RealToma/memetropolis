import { useState, useEffect } from 'react'
import { readContract } from '@wagmi/core'
import { formatEther } from 'viem'
import TokenFactoryABI from '@/core/constants/abi/token-factory'
import CHAINLINK_PRICE_FEED_ABI from '@/core/constants/abi/chain-link-price-feed'
import {
  TOKEN_FACTORY_ADDRESSES,
  CHAINLINK_ETH_USD_FEED,
} from '@/core/constants/address'
import { useEvmAccount } from '@/core/hooks/evm/use-account'
import { ChainId, wagmiConfig } from '@/core/lib/wagmi'

const MAX_SUPPLY = 1_000_000 // 1 million

// Define the type for tokenInfo
type TokenInfo = [
  string, // name
  string, // symbol
  string, // description
  string, // tokenImageUrl
  bigint, // fundingRaised
  boolean, // isFundingFinished
  string, // tokenAddress
  string, // creatorAddress
]

export const useTokenDetails = (tokenAddress: string, chainId: number) => {
  const [tokenPrice, setTokenPrice] = useState<string>('0')
  const [marketCap, setMarketCap] = useState<string>('0')
  const [fdv, setFdv] = useState<string>('0')
  const [liquidity, setLiquidity] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(true)
  const { wallet } = useEvmAccount()
  const [ethPriceInUSD, setEthPriceInUSD] = useState<number>(0)

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!wallet || !wallet.chainId || !tokenAddress) {
        setIsLoading(false)
        return
      }

      try {
        // Fetch ETH price in USD from Chainlink
        const ethUsdPriceFeedAddress = CHAINLINK_ETH_USD_FEED[chainId]
        if (ethUsdPriceFeedAddress) {
          const result = (await readContract(wagmiConfig, {
            address: ethUsdPriceFeedAddress as `0x${string}`,
            abi: CHAINLINK_PRICE_FEED_ABI,
            functionName: 'latestRoundData',
            chainId: chainId as ChainId,
          })) as [bigint, bigint, bigint, bigint, bigint]

          const answer = result[1]
          const ethPrice = Number(answer) / 1e8 // Chainlink prices have 8 decimals
          setEthPriceInUSD(ethPrice)
        } else {
          console.warn(
            `No Chainlink ETH/USD feed available for chain ID ${chainId}`,
          )
          setEthPriceInUSD(2000) // Fallback to a default value
        }

        const tokenPriceInETH = await readContract(wagmiConfig, {
          address: TOKEN_FACTORY_ADDRESSES[chainId] as `0x${string}`,
          abi: TokenFactoryABI,
          functionName: 'getCurrentTokenPrice',
          args: [tokenAddress],
          chainId: chainId as ChainId,
        })

        const tokenPriceInUSD =
          Number(formatEther(tokenPriceInETH as bigint)) * ethPriceInUSD

        setTokenPrice(tokenPriceInUSD.toFixed(8))

        const marketCapValue = MAX_SUPPLY * tokenPriceInUSD
        setMarketCap(marketCapValue.toFixed(2))

        // TODO: Fdv calculation should be implemented here
        setFdv(marketCapValue.toFixed(2))

        // Fetch fundingRaised from addressToMemeTokenMapping
        const tokenInfo = (await readContract(wagmiConfig, {
          address: TOKEN_FACTORY_ADDRESSES[chainId] as `0x${string}`,
          abi: TokenFactoryABI,
          functionName: 'addressToMemeTokenMapping',
          args: [tokenAddress],
          chainId: chainId as ChainId,
        })) as TokenInfo

        const fundingRaisedWei = tokenInfo[4]
        const fundingRaisedETH = Number(formatEther(fundingRaisedWei))
        const liquidityUSD = fundingRaisedETH * ethPriceInUSD

        setLiquidity(liquidityUSD.toFixed(2))

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching token details:', error)
        setIsLoading(false)
      }
    }

    fetchTokenDetails()
  }, [wallet, chainId, tokenAddress])

  return { tokenPrice, marketCap, fdv, liquidity, isLoading }
}
