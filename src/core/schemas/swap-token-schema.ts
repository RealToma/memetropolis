import { z } from 'zod'

export const swapTokenSchema = z.object({
  chainId: z.number(),
  sellBuyFlag: z.string(),
  tokenAddress: z.string(),
  tokenQty: z.number(),
})
export type SwapTokenSchema = z.infer<typeof swapTokenSchema>
