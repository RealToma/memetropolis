import { UseMutationResult } from '@tanstack/react-query'
import { CreateTokenSchema } from '@/core/schemas/create-token-schema'
import { SwapTokenSchema } from '@/core/schemas/swap-token-schema'
import { CrosschainSwapTokenSchema } from '@/core/schemas/crosschain-swap-token-schema'
import { CrosschainQuoteSchema } from '@/core/schemas/crosschain-quote-schema'

export namespace UseCreateToken {
  export type Params = {
    data: CreateTokenSchema
  }
  export type ReturnType = UseMutationResult<
    {
      transactionHash: string
      transactionUrl: string
      owner: string
    },
    Error,
    Params
  >
  export type FunctionType = () => ReturnType
}

export namespace UseSwapToken {
  export type Params = {
    data: SwapTokenSchema
  }
  export type ReturnType = UseMutationResult<
    {
      transactionHash: string
      transactionUrl: string
      result: number // buy - result, sell - receivedAmount
    },
    Error,
    Params
  >
  export type FunctionType = () => ReturnType
}

export namespace UseCrosschainSwapToken {
  export interface Params {
    data: CrosschainSwapTokenSchema
  }

  export interface Result {
    transactionHash: string
    transactionUrl: string
  }

  export type FunctionType = () => UseMutationResult<Result, Error, Params>
}

export namespace UseCrosschainQuote {
  export interface Params {
    data: CrosschainQuoteSchema
  }

  export interface Result {
    value: any
  }

  export type FunctionType = () => UseMutationResult<Result, Error, Params>
}
