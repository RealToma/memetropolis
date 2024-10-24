import { useEvmAccount } from '@/core/hooks/evm/use-account'
import { useTokenDetails } from '@/core/services/_contract/evm/use-token-details'

interface DetailCardProps {
  title: string
  value: string
  showArrow?: boolean
}

const DetailCard = ({ title, value, showArrow = false }: DetailCardProps) => {
  return (
    <div className="flex h-[93px] w-[194px] flex-col items-center justify-center bg-[url('/assets/img/project/token-details/background2.svg')] bg-cover">
      <div className="mb-2 text-sm text-gray-400">{title}</div>
      <div className="text-lg font-semibold text-white">
        {value}
        {showArrow && (
          <span className="ml-2 inline-block text-green-500">▼</span>
        )}
      </div>
    </div>
  )
}

interface TokenDetailsProps {
  tokenAddress: string
  chainId: string
}

const TokenDetails = ({ tokenAddress, chainId }: TokenDetailsProps) => {
  const { wallet } = useEvmAccount()
  const { tokenPrice, marketCap, fdv, liquidity, isLoading } = useTokenDetails(
    tokenAddress,
    Number(chainId),
  )

  if (isLoading) {
    return (
      <div className="flex h-[283px] w-[510px] items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#FFFAFF]"></div>
      </div>
    )
  }

  return (
    <div className="relative flex h-[283px] w-full max-w-[510px] flex-col items-center justify-center rounded-lg bg-[url('/assets/img/project/token-details/background1.svg')] bg-cover p-8">
      <p className="absolute -top-3 left-[10%] flex gap-2 bg-[#110A1A] px-2 font-bold">
        Token details
        <img
          src="/assets/img/icons/trading-details-ribbon.svg"
          alt="Token details ribbon"
        />
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        <DetailCard
          title="Price (USDT)"
          value={`$${tokenPrice}`}
          showArrow={true}
        />
        <DetailCard title="Liquidity" value={`$${liquidity}`} />
        <DetailCard title="FDV" value={`$${fdv}`} />
        <DetailCard title="Marketcap" value={`$${marketCap}`} />
      </div>
    </div>
  )
}

export default TokenDetails
