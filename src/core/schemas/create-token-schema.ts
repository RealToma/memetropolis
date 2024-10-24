import { z } from 'zod'

export const createTokenSchema = z.object({
  image: z.string().optional(),
  chain: z.string().min(1, 'Chain is required'),
  jeetTax: z.number().min(0, 'Jeet tax must be non-negative'),
  name: z.string().min(1, 'Token name is required'),
  symbol: z.string().min(1, 'Token symbol is required'),
  description: z.string().min(1, 'Description is required'),
  kyc: z.string().optional(),
  xLink: z.string().optional(),
  telegramLink: z.string().optional(),
})
export type CreateTokenSchema = z.infer<typeof createTokenSchema>
