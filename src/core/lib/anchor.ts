import { ConfirmOptions, Connection } from '@solana/web3.js'
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { PROGRAMS_IDL } from '@/core/constants/anchor'

export const usePumpfunAnchor = () => {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()
  const program = getProgram(connection, 'PUMPFUN', wallet as any, {
    commitment: 'confirmed',
  })

  return program
}

export const solana = {
  id: 999,
  name: 'Solana',
  nativeCurrency: {
    decimals: 9,
    name: 'Solana',
    symbol: 'SOL',
  },
  rpcUrls: {
    default: {
      http: ['https://api.mainnet-beta.solana.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Solana Mainnet Explorer', url: 'https://solscan.io/' },
  },
} as const

export const SOLANA = [solana] as const

export const getProgram = (
  connection: Connection,
  program: string,
  wallet: Wallet,
  confirmOptions?: ConfirmOptions,
) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    confirmOptions ?? { commitment: 'confirmed' },
  )
  return new Program(
    PROGRAMS_IDL[program],
    PROGRAMS_IDL[program].address,
    provider,
  )
}
