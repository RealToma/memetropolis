'use client'

import { useSearchParams, useParams } from 'next/navigation'

import TokenPageContainer from '../_containers/page-container'

export default function Token() {
  const searchParams = useSearchParams()
  const params = useParams()
  const chainId = searchParams.get('chain') || ''
  const tokenSymbol = searchParams.get('symbol') || ''
  const tokenAddress = params.tokenAddress as string

  return (
    <TokenPageContainer
      tokenAddress={tokenAddress}
      tokenSymbol={tokenSymbol}
      chainId={chainId}
    />
  )
}
