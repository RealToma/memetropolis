import { z } from 'zod'

export const createAdvancedTokenSchema = z.object({
  chain: z.string().min(1, 'Chain is required'),
  jeetTax: z.string().min(1, 'Jeet tax is required'),
  name: z.string().min(1, 'Token name is required'),
  description: z.string().min(1, 'Description is required'),
  kyc: z.string().min(1, 'KYC information is required'),
  xLink: z.string().optional(),
  telegramLink: z.string().optional(),
  totalSupply: z.string().min(1, 'Total supply is required'),
  raisedAmount: z.string().min(1, 'Raised amount is required'),
  salesRatio: z.string().min(1, 'Sales ratio is required'),
  reservedRatio: z.string().min(1, 'Reserved ratio is required'),
  liquidityPoolRatio: z.string().min(1, 'Liquidity Pool Ratio is required'),
  launchDate: z.string().min(1, 'Launch date is required'),
  launchTime: z.string().min(1, 'Launch time is required'),
  allocationPerChain: z.string().min(1, 'Allocation per chain is required'),
  chainsSelected: z.string().min(1, 'Chains selected is required'),
  maximumPerUser: z.string().min(1, 'Maximum per user is required'),
})

export type CreateAdvancedTokenSchema = z.infer<
  typeof createAdvancedTokenSchema
>
