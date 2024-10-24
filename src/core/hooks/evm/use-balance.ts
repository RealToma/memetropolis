import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

export const useBalance = (
  walletAddress: string | undefined,
  providerUrl: string,
) => {
  return useQuery({
    queryKey: ['EVM-BALANCE', { walletAddress, providerUrl }],
    queryFn: async () => {
      if (walletAddress == null) {
        console.log('walletAddress is null')
        return 0
      }

      const provider = new ethers.providers.JsonRpcProvider(providerUrl)
      const balanceInWei = await provider.getBalance(walletAddress)

      return parseFloat(ethers.utils.formatEther(balanceInWei))
    },
  })
}
