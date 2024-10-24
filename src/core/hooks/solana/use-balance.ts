import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useConnection } from '@solana/wallet-adapter-react'
import {
  getAccount,
  getAssociatedTokenAddressSync
} from '@solana/spl-token'

export const useBalance = (walletAddress: string | undefined) => {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['SOL-BALANCE', { walletAddress }],
    queryFn: async () => {
      if (walletAddress == null) {
        return 0
      }

      const balanceInLamports = await connection.getBalance(
        new PublicKey(walletAddress),
      )

      return balanceInLamports / LAMPORTS_PER_SOL
    },
  })
}

//
export const useTokenBalance = (walletAddress: string | undefined , tokenMint: string) => {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['SOLANA-TOKEN-BALANCE', { walletAddress, tokenMint }],
    queryFn: async () => {
      if (!walletAddress) {
        return 0
      }
      const owner = new PublicKey(walletAddress)
      //tokenAccount
      const associtedUserTokenAccount = getAssociatedTokenAddressSync(
        new PublicKey(tokenMint),
        owner,
       )
      let userTokenAccountInfo = null
      try {
        userTokenAccountInfo = await getAccount(
          connection,
          associtedUserTokenAccount,
        )
      } catch {
        userTokenAccountInfo = null
      }
      if (!userTokenAccountInfo) return 0

      const balanceInLamports = userTokenAccountInfo.amount

      return Number(balanceInLamports) / LAMPORTS_PER_SOL
    },
  })
}