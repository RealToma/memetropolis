import { useMutation } from '@tanstack/react-query'
import { UseSwapToken } from '@/core/types/contract'
import { createSolanaTxObject } from '@/core/utils'
import { usePumpfunAnchor } from '@/core/lib/anchor'
import { useSolanaAccount } from '@/core/hooks/solana/use-account'
import { BN } from '@coral-xyz/anchor'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import {
  getAssociatedTokenAddressSync,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAccount,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token'
import { useBalance } from '@/core/hooks/solana/use-balance'

export const useSolanaSwapToken: UseSwapToken.FunctionType = () => {
  const program = usePumpfunAnchor()
  const { wallet, isConnected } = useSolanaAccount()
  const { data: balance } = useBalance(wallet?.address)

  return useMutation({
    mutationFn: async ({ data }) => {
      if (!wallet || !isConnected || !program) {
        throw new Error('No wallet found')
      }

      const solLamports = BigInt(data.tokenQty * 10**9) // with decimal
      const tokenMint = new PublicKey(data.tokenAddress)
      const payer = new PublicKey(wallet.address)
      const [oftConfig] = PublicKey.findProgramAddressSync(
        [Buffer.from('Oft'), tokenMint.toBuffer()],
        program.programId,
      )

      const [ globalConfig ] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("pumpfun_config"),
        ],
        program.programId,
      )
      const [bondingCurve] = PublicKey.findProgramAddressSync(
        [Buffer.from('pumpfun_bonding_curve'), tokenMint.toBuffer()],
        program.programId,
      )

      const associtedBondingCurve = getAssociatedTokenAddressSync(
        tokenMint,
        bondingCurve,
        true,
      )
      const associtedUserTokenAccount = getAssociatedTokenAddressSync(
        tokenMint,
        payer,
      )

      if (data.sellBuyFlag == 'buy') {
        if ((balance ?? 0) * 1000000000 < solLamports) {
          throw new Error('Not enough balance')
        }
        const transaction = new Transaction()
        let userTokenAccountInfo = null
        try {
          userTokenAccountInfo = await getAccount(
            program.provider.connection,
            associtedUserTokenAccount,
          )
        } catch {
          userTokenAccountInfo = null
        }
        if (!userTokenAccountInfo){
          transaction.add(
            createAssociatedTokenAccountInstruction(
              payer,
              associtedUserTokenAccount,
              payer,
              tokenMint,
            ))
        }

        const buyIns = await program.methods.buyInSol(
          new BN("0"),  //Min token Amount
          new BN(solLamports.toString()) //amountInSol
        ).accounts({
          tokenMint,
          oftConfig,
          globalConfig,
          bondingCurve,
          associtedBondingCurve,
          associtedUserTokenAccount,
          user: payer,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        }).instruction()
        transaction.add(buyIns)
        const hash = await program.provider.sendAndConfirm!(transaction, [])
        return {
          ...createSolanaTxObject({ tx: { hash } }),
          result: 1,
        }
      } else {
        //get
        let tokenAccountInfo = null
        try {
          tokenAccountInfo = await getAccount(
            program.provider.connection,
            associtedUserTokenAccount,
          )
        } catch {
          tokenAccountInfo = null
        }
        if (!tokenAccountInfo || tokenAccountInfo.amount < solLamports) {
          throw new Error('Not enough Token balance')
        }

        const hash = await program.methods.sell(
          new BN(Number(solLamports)), // input Token amount
        ).accounts({
          tokenMint,
          oftConfig,
          globalConfig,
          bondingCurve,
          associtedBondingCurve,
          associtedUserTokenAccount,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          user: payer
        }).signers([]).rpc()

        return {
          ...createSolanaTxObject({ tx: { hash } }),
          result: 1,
        }
      }
    },
  })
}
