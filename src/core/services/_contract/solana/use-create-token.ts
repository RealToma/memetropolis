import { useMutation } from '@tanstack/react-query'
import { UseCreateToken } from '@/core/types/contract'
import { createSolanaTxObject } from '@/core/utils'
import { usePumpfunAnchor } from '@/core/lib/anchor'
import { useSolanaAccount } from '@/core/hooks/solana/use-account'
import {
  PublicKey,
  Keypair,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  createInitializeMint2Instruction,
  createAssociatedTokenAccountInstruction
} from '@solana/spl-token'
import { OftTools } from '@layerzerolabs/lz-solana-sdk-v2'

export const useCreateToken: UseCreateToken.FunctionType = () => {
  const program = usePumpfunAnchor()
  const { wallet, isConnected } = useSolanaAccount()

  return useMutation({
    mutationFn: async ({ data }) => {
      if (!wallet || !isConnected || !program) {
        throw new Error('No wallet found')
      }
      const tokenMintKP = Keypair.generate()

      const [oftConfig] = PublicKey.findProgramAddressSync(
        [Buffer.from('Oft'), tokenMintKP.publicKey.toBuffer()],
        program.programId,
      )

      const [lzReceiveTypesAccounts] = PublicKey.findProgramAddressSync(
        [Buffer.from('LzReceiveTypes'), oftConfig.toBuffer()],
        program.programId,
      )
      const [bondingCurve] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('pumpfun_bonding_curve'),
          tokenMintKP.publicKey.toBuffer(),
        ],
        program.programId,
      )
      const associtedBondingCurve = getAssociatedTokenAddressSync(
        tokenMintKP.publicKey,
        bondingCurve,
        true,
      )
      const associtedUserTokenAccount = getAssociatedTokenAddressSync(
        tokenMintKP.publicKey,
        new PublicKey(wallet.address),
      )
      const metaplexProgramId = new PublicKey(
        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
      )
      const [metadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          metaplexProgramId.toBuffer(), // mpl_token_metadata program id
          tokenMintKP.publicKey.toBuffer(),
        ],
        metaplexProgramId,
      )
      let transaction = new Transaction()
      const payer = new PublicKey(wallet.address)
      const endpointProgram = new PublicKey("76y77prsiCMvXMjuoZ5VRrhG5qYBrUMYTE5WgHqgjEn6")
      const lamports = await getMinimumBalanceForRentExemptMint(program.provider.connection)
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: payer,
          newAccountPubkey: tokenMintKP.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(tokenMintKP.publicKey, 9, oftConfig, null, TOKEN_PROGRAM_ID),
      )
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payer,
          associtedBondingCurve,
          bondingCurve,
          tokenMintKP.publicKey,
        )
      )
      const createMemeTokenIns = await program.methods.createToken({
        name: Buffer.from(data.name),
        symbol: Buffer.from(data.name),
        uri: Buffer.from(data.image || ''),
        endpointProgram,
      }).accounts({
        payer,
        tokenMint: tokenMintKP.publicKey,
        oftConfig,
        bondingCurve,
        associtedBondingCurve,
        metadata,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenMetadataProgram: metaplexProgramId,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId
      }).instruction()
      transaction.add(createMemeTokenIns)
      const initOftIx = await OftTools.createInitNativeOftIx(
        program.programId,
        payer,
        payer,
        tokenMintKP.publicKey,
        oftConfig
      )
      transaction.add(initOftIx)
      const hash = await program.provider.sendAndConfirm!(transaction, [tokenMintKP])

      // const hash = await sendAndConfirmTransaction(program.provider.connection, transaction, [tokenMintKP])
      return {
        ...createSolanaTxObject({ tx: { hash } }),
        owner: wallet.address,
      }
    },
  })
}
