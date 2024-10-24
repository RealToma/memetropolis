import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CrosschainSwapTokenSchema } from '@/core/schemas/crosschain-swap-token-schema'
import DropdownToken from './dropdown-token'
import { useCrosschainQuote } from '@/core/services/_contract/evm/use-crosschain-quote'

import { useEvmAccount } from '@/core/hooks/evm/use-account'
import { getChainLogo } from "@/core/utils";

interface CrosschainContentProps {
  tokenAddress: string
  tokenSymbol: string
  chainId: string
  onSubmit: (data: CrosschainSwapTokenSchema) => void
  isPending: boolean
}

export function CorsschainContent({
  tokenAddress,
  tokenSymbol,
  chainId,
  onSubmit,
  isPending,
}: CrosschainContentProps) {
  const [isAmountLocked, setIsAmountLocked] = useState(false)
  const [sendAmount, setSendAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('0')
  const [nativeToken, setNativeToken] = useState(chainId)
  const [isBuySell, setIsBuySell] = useState('sell')

  const { wallet } = useEvmAccount()
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)

  const handleSendAmountChange = (value: string) => {
    const regex = /^\d*\.?\d{0,8}$/
    if (regex.test(value) || value === '') {
      setSendAmount(value)
    }
  }

  const { mutate: crossChainQuoteMutate, isPending: crossChainQuoteIsPending } =
    useCrosschainQuote()

  useEffect(() => {
    if (!sendAmount) {
      setReceiveAmount('0')
      setIsLoadingQuote(false)
      return
    }

    setIsLoadingQuote(true)
    const data = {
      sellBuyFlag: isBuySell as 'buy' | 'sell',
      chainId: Number(chainId),
      memeTokenAddress: tokenAddress,
      value: sendAmount,
    }

    crossChainQuoteMutate(
      { data },
      {
        onSuccess: (result) => {
          setReceiveAmount(result.value)
          setIsLoadingQuote(false)
        },
        onError: (e: any) => {
          console.log(e.shortMessage)
          setIsLoadingQuote(false)
        },
      },
    )
  }, [sendAmount, isBuySell, chainId, tokenAddress, crossChainQuoteMutate])

  const toggleAmountLock = useCallback(() => {
    setIsAmountLocked((prev) => !prev)
    setSendAmount('')
  }, [])

  const handleTokenToggle = () => {
    setSendAmount('')
    setReceiveAmount('0')
    if (isBuySell == 'buy') setIsBuySell('sell')
    else setIsBuySell('buy')
  }

  if (wallet?.chainId === Number(chainId) && !isPending) {
    return (
      <p className="h-[298px] text-2xl">
        Please switch to other chain we support.
      </p>
    )
  }

  return (
    <>
      <div className="relative mb-6 w-full max-w-[570px] rounded-lg p-4">
        <div className="relative flex items-center justify-between rounded-lg border border-[#FFFEEF] px-5">
          <div className="absolute left-5 top-0 mb-2 -translate-y-1/2 bg-[#07040B] px-2 text-xs font-bold text-accent">
            SEND
          </div>
          <input
            type="text"
            value={sendAmount}
            onChange={(e) => handleSendAmountChange(e.target.value)}
            className="w-full border-r-2 border-white bg-transparent py-4 text-white outline-none placeholder:text-[#605B66]"
            placeholder="0.00000000"
            readOnly={isAmountLocked}
          />
          {isBuySell !== 'buy' ? (
            <div className="flex w-[150px] items-center justify-center space-x-1 py-1 pl-5 text-white">
              <Image
                src={getChainLogo(Number(chainId))}
                width={20}
                height={20}
                alt="Token Chain Image"
              />
              <span>{tokenSymbol}</span>
            </div>
          ) : (
            <DropdownToken
              nativeToken={nativeToken}
              setNativeToken={setNativeToken}
            />
          )}
        </div>

        <div className="absolute bottom-0 left-8 h-4 w-[1px] bg-accent"></div>
        <div
          onClick={toggleAmountLock}
          className={`absolute -bottom-6 left-5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full ${isAmountLocked ? 'border border-accent bg-transparent' : 'bg-[#C3C0D8]'}`}
        >
          <Image
            src={
              isAmountLocked
                ? '/assets/img/project/swap/icon-lock.svg'
                : '/assets/img/project/swap/icon-unlock.svg'
            }
            width={16}
            height={16}
            alt="Swap Image"
          />
        </div>
        <div className="absolute -bottom-10 left-8 h-4 w-[1px] bg-accent"></div>

        <Image
          src="/assets/img/project/swap/icon-swap.svg"
          width={20}
          height={20}
          alt="Swap Image"
          className="absolute -bottom-5 right-8 cursor-pointer"
          onClick={handleTokenToggle}
        />
      </div>

      <div className="mb-6 w-full max-w-[570px] rounded-lg p-4">
        <div className="relative flex items-center justify-between rounded-lg border border-[#FFFEEF] px-5">
          <div className="absolute left-5 top-0 mb-2 -translate-y-1/2 bg-[#07040B] px-2 text-xs font-bold text-accent">
            GET UP TO
          </div>
          <div className="relative flex w-full items-center border-r-2 border-white py-4">
            <input
              type="text"
              value={receiveAmount}
              readOnly
              className={`w-full bg-transparent text-white outline-none transition-all duration-300 ${
                isLoadingQuote ? 'blur-sm' : ''
              }`}
            />
            {isLoadingQuote && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </div>
            )}
          </div>

          {isBuySell === 'buy' ? (
            <div className="flex w-[150px] items-center space-x-1 py-1 pl-5 text-white">
              <Image
                src={getChainLogo(Number(chainId))}
                width={20}
                height={20}
                alt="Token Chain Image"
              />
              <span>{tokenSymbol}</span>
            </div>
          ) : (
            <DropdownToken
              nativeToken={nativeToken}
              setNativeToken={setNativeToken}
            />
          )}
        </div>
      </div>

      <Button
        borderColor="border-accent"
        className={
          'group relative h-[60px] w-[300px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[570px]'
        }
        onClick={() => {
          onSubmit({
            sellBuyFlag: isBuySell as 'buy' | 'sell',
            chainId: Number(wallet?.chainId),
            memeTokenAddress: tokenAddress,
            dstEid: Number(chainId),
            value: sendAmount,
          })
        }}
        disabled={Number(sendAmount) === 0 || !wallet?.address}
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
            <span className="relative z-10 ml-2">Processing...</span>
          </div>
        ) : (
          <span className="relative z-10">Exchange</span>
        )}
      </Button>
    </>
  )
}
