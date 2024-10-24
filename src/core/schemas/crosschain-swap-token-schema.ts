import { z } from 'zod'

export const crosschainSwapTokenSchema = z.object({
  chainId: z.number(),
  sellBuyFlag: z.string(),
  dstEid: z.number(),
  memeTokenAddress: z.string(),
  value: z.string(), // ethAmount = buy, tokenQty = sell
})
export type CrosschainSwapTokenSchema = z.infer<
  typeof crosschainSwapTokenSchema
>
