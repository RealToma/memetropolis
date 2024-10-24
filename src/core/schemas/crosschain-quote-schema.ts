import { z } from 'zod'

export const crosschainQuoteSchema = z.object({
  sellBuyFlag: z.string(),
  chainId: z.number(),
  memeTokenAddress: z.string(),
  value: z.string(), // ethAmount = buy, tokenQty = sell
})
export type CrosschainQuoteSchema = z.infer<typeof crosschainQuoteSchema>
