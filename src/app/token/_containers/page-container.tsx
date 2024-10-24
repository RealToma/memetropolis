import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { getTokenByAddress } from '@/core/services/_api/use-token'
import { copyToClipboard } from '@/core/utils/copy-to-clipboard'
import { formatDate, getTimeAgo } from '@/core/utils/format-date'

import CarouselContent from '../../launch-token/_components/carousel-content'
import TradingChat from '../../_containers/trading-chat'
import Spotlights from '../../_containers/spotlights'
import TopTraders from '../../_containers/top-traders'

import TokenDetails from '../../_components/token-details'
import TokenSwap from '../_components/token-swap'

const CopyableAddress = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copyToClipboard(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <div className="absolute bottom-0 right-[5%] w-[39%] translate-y-1/2 rounded-md border-[3px] border-dashed border-[#8C8432] px-[10px] py-[5px]">
      <button
        onClick={handleCopy}
        className="flex w-full gap-[10px] overflow-hidden text-[#B5B3B8]"
      >
        <img
          src="/assets/img/icons/copy.svg"
          alt="Copy"
          className="flex-shrink-0"
        />
        <span className="truncate" title={address}>
          CA: {address}
        </span>
      </button>
    </div>
  )
}

const TradingDetails = () => {
  return (
    <div className="relative flex h-[283px] w-full max-w-[510px] flex-col items-center justify-center rounded-lg bg-[url('/assets/img/project/token-details/background1.svg')] bg-cover p-8">
      <p className="absolute -top-3 left-[10%] flex gap-2 bg-[#110A1A] px-2 font-bold">
        Trading details
        <img src="/assets/img/icons/trading-details-ribbon.svg" />
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          {['5M', '1H', '6H', '24H'].map((period) => (
            <div key={period} className="rounded bg-[#1E1E1E] p-2">
              <div className="text-sm font-semibold text-[#605B66]">
                {period}
              </div>
              <div className="text-sm text-[#00FFA3]">16.81%</div>
            </div>
          ))}
        </div>
        <div className='bg-[url("/assets/img/project/trading-details/background1.svg")] bg-cover px-12 py-3'>
          <div className="grid grid-cols-5 gap-2 text-center">
            {['Txns', 'Vol', 'Makers', 'Min', 'Max'].map((label) => (
              <div key={label} className="rounded p-2">
                <div className="text-sm text-gray-400">{label}</div>
                <div className="text-[#B5B3B8]">358</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex">
              <div className="h-2 w-3/5 rounded-full bg-[#00FFA3]"></div>
              <div className="h-2 w-2/5 rounded-full bg-[#E93A43]"></div>
            </div>
            <div className="flex justify-between text-sm text-[#605B66]">
              <div>
                <span className="">Buys: </span>
                <span className="">350</span>
              </div>
              <div>
                <span className="">Sell: </span>
                <span className="">290</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-[#FFFEEF]">$121002.30</div>
              <div className="text-[#FFFEEF]">82175.32.91</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Chart = () => {
  return (
    <>
      <h1 className="text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Chart
      </h1>
      <img src="/assets/img/home/charts/chart.svg" />
    </>
  )
}

const Transactions = () => {
  return (
    <>
      <h1 className="relative text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Transactions
      </h1>

      <div className="flex flex-col gap-8">
        <div className="flex w-full">
          <img src="/assets/img/home/trader-ribbon-2.svg" className="w-2/5" />
          <img
            src="/assets/img/home/trader-ribbon-1.svg"
            className="-ml-[10%] w-2/5"
          />
          <img
            src="/assets/img/home/trader-ribbon-2.svg"
            className="-ml-[10%] w-2/5 -scale-x-100"
          />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-separate">
            <thead className="text-left text-[#999999]">
              <tr>
                <th className="min-w-[90px]">
                  <p className="flex gap-1">
                    Date
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
                <th className="min-w-[50px]">
                  <p className="flex gap-1">
                    Type
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
                <th className="min-w-[120px]">
                  <p className="flex gap-1">
                    USD
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
                <th className="min-w-[200px]">
                  <p className="flex gap-1">
                    PONKE
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
                <th className="min-w-[100px]">
                  <p className="flex gap-1">
                    SOL
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
                <th className="min-w-[100px]">
                  <p className="flex gap-1">
                    Price
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
                <th className="min-w-[200px]">
                  <p className="flex gap-1">
                    Maker
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
                <th className="min-w-[40px]">
                  <p className="flex gap-1">
                    TXN
                    <img src="/assets/img/icons/mingcute_filter-fill.svg" />
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {Array(10)
                .fill(null)
                .map((_, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? 'text-[#00FFA3]' : 'text-[#EC205E]'
                    }
                  >
                    <td className="py-2 text-[#928E96]">15s ago</td>
                    <td>Buy</td>
                    <td>$2892.21</td>
                    <td>$2000391.21</td>
                    <td>4.391</td>
                    <td>$0.001304</td>
                    <td>
                      <p className="flex items-center gap-1">
                        <img
                          src={
                            index % 2 === 0
                              ? '/assets/img/icons/fa6-solid_shrimp.svg'
                              : '/assets/img/icons/fxemoji_spurtingwhale.svg'
                          }
                          className="mr-1"
                        />
                        39830g
                        <img
                          src="/assets/img/icons/progress-bar.svg"
                          className="ml-2"
                        />
                      </p>
                    </td>
                    <td>
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary">
                        <img
                          src="/assets/img/icons/arrow-top-right.svg"
                          className=""
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-full">
          <img
            src="/assets/img/home/trader-ribbon-2.svg"
            className="w-2/5 -scale-y-100"
          />
          <img
            src="/assets/img/home/trader-ribbon-1.svg"
            className="-ml-[10%] w-2/5 -scale-y-100"
          />
          <img
            src="/assets/img/home/trader-ribbon-2.svg"
            className="-ml-[10%] w-2/5 -scale-x-100 -scale-y-100"
          />
        </div>
      </div>
    </>
  )
}

interface TokenPageProps {
  tokenAddress: string
  tokenSymbol: string
  chainId: string
}
const TokenPageContainer = ({
  tokenAddress,
  tokenSymbol,
  chainId,
}: TokenPageProps) => {
  const { data: tokenDetails, isLoading } = useQuery(
    getTokenByAddress(tokenAddress),
  )

  console.log('tokenDetails: ', tokenDetails)

  const [imageError, setImageError] = useState(false)
  const handleImageError = () => {
    setImageError(true)
  }

  const [ownerImageError, setOwnerImageError] = useState(false)
  const handleOwnerImageError = () => {
    setOwnerImageError(true)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#FFFAFF]"></div>
      </div>
    )
  }

  if (!tokenDetails) {
    return <div>Error loading token details</div>
  }

  return (
    <main className="flex h-full w-full flex-col items-center justify-between gap-10 pb-10 pt-28 md:gap-36 md:pb-28 2xl:gap-52 2xl:pt-40">
      <div className="relative flex w-full flex-col gap-8 md:gap-16">
        <CarouselContent />

        <section className="relative mx-auto w-full max-w-[1300px] px-3">
          <img src="/assets/img/project/top/background.svg" />
          <div className="absolute left-[5%] top-0 flex -translate-y-1/2 gap-2 rounded-md bg-accent p-[10px] font-medium text-primary">
            <img src="/assets/img/icons/calendar.svg" />
            Launch date: {formatDate(tokenDetails.creationTimestamp)}
          </div>
          <div className="absolute right-[1%] top-[1%] w-[25%] space-y-2">
            <div className="flex justify-between">
              <p className="flex gap-2">
                {tokenDetails.ownerImage && !ownerImageError ? (
                  <img
                    src={tokenDetails.ownerImage}
                    className="h-[20px] w-[20px] rounded-full"
                    alt=""
                    onError={handleOwnerImageError}
                  />
                ) : (
                  <img src="/assets/img/icons/avatar_ava.svg" />
                )}

                {tokenDetails.ownerName}
              </p>
              <p className="text-[#725AC1]">
                {getTimeAgo(tokenDetails.creationTimestamp)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="flex gap-[6px] text-sm text-[#928E96]">
                <img src="/assets/img/icons/bi_people-fill.svg" />
                10034 followers
              </p>
              <div className="flex items-center space-x-4">
                <img src="/assets/img/icons/facebook.svg" className="h-4 w-4" />
                <img src="/assets/img/icons/x.svg" className="h-4 w-4" />
                <img src="/assets/img/icons/linkedin.svg" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-[10%] translate-y-1/3">
            {tokenDetails.image && !imageError ? (
              <img
                src={tokenDetails.image}
                className="h-[130px] w-[130px]"
                alt={tokenDetails.name || ''}
                onError={handleImageError}
              />
            ) : (
              <img
                src="/assets/img/project/top/token.svg"
                className="h-[130px] w-[130px]"
                alt={tokenDetails.name || ''}
                onError={handleImageError}
              />
            )}
            <p className="text-lg font-semibold">${tokenDetails.symbol}</p>
            <p className="text-[#928E96]">{tokenDetails.name}</p>
            <div className="flex items-center space-x-4">
              <img src="/assets/img/icons/facebook.svg" className="h-4 w-4" />
              <img src="/assets/img/icons/x.svg" className="h-4 w-4" />
              <img src="/assets/img/icons/linkedin.svg" />
            </div>
          </div>
          <CopyableAddress address={tokenAddress} />
        </section>

        <section className="mx-auto mt-20 flex w-full max-w-[1300px] flex-col justify-between gap-6 px-3 md:flex-row">
          <TokenDetails tokenAddress={tokenAddress} chainId={chainId} />
          <TradingDetails />
        </section>
      </div>

      <section className="mx-auto flex w-full max-w-[1300px] flex-col gap-16 px-3">
        <TokenSwap
          tokenAddress={tokenAddress}
          tokenSymbol={tokenSymbol}
          chainId={chainId}
        />
      </section>

      <section className="mx-auto flex w-full max-w-[1300px] flex-col gap-16 px-3">
        <Chart />
      </section>

      <section className="mx-auto flex w-full max-w-[1300px] flex-col gap-16 px-3">
        <Transactions />
      </section>

      <section className="mx-auto flex w-full max-w-[1300px] flex-col gap-16 px-3">
        <TradingChat />
      </section>

      <section className="mx-auto flex w-full max-w-[1300px] flex-col items-center gap-16 px-3">
        <TopTraders />
      </section>

      <section className="relative w-full">
        <img
          src="/assets/img/home/spotlights/bg-gradient-effect-tr.svg"
          className="absolute right-0 top-0 h-[494px] w-[439px] -translate-y-1/2"
        />
        <img
          src="/assets/img/home/spotlights/bg-gradient-effect-bl.svg"
          className="absolute bottom-0 left-0 h-[494px] w-[439px] translate-y-1/2"
        />
        <Spotlights />
      </section>
    </main>
  )
}

export default TokenPageContainer
