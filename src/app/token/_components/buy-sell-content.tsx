import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { SwapTokenSchema } from '@/core/schemas/swap-token-schema'
import { useSolanaAccount } from '@/core/hooks/solana/use-account'
import { useBalance, useTokenBalance } from '@/core/hooks/solana/use-balance'
import { getChainShortName } from "@/core/utils";

interface BuySellContentProps {
  activeTab: 'Buy' | 'Sell'
  tokenAddress: string
  chainId: string
  onSubmit: (data: SwapTokenSchema) => void
  isPending: boolean
}

export function BuySellContent({
  activeTab,
  tokenAddress,
  chainId,
  onSubmit,
  isPending,
}: BuySellContentProps) {
  const [amount, setAmount] = useState('')
  const { wallet } = useSolanaAccount()
  const { data: solBalance } = useBalance(wallet?.address)
  // const [balance, setBalance] = useState(solBalance)
  const { data: tokenBalance } = useTokenBalance(wallet?.address, tokenAddress)

  const handleAmountChange = useCallback((value: string) => {
    const regex = /^\d*\.?\d{0,8}$/
    if (regex.test(value) || value === '') {
      setAmount(value)
    }
  }, [])

  const handleQuickAmount = (value: number) => {
    setAmount(Math.min(value, solBalance ?? 0).toString())
  }

  const handleMaxAmount = () => {
    if (activeTab === 'Buy') {
      setAmount(solBalance ? solBalance.toString() : '0')
    } else {
      // Sell
      setAmount(tokenBalance ? tokenBalance.toString() : '0')
    }
  }

  useEffect(() => {
    const numAmount = parseFloat(amount)
    if (activeTab === 'Buy') {
      if (numAmount > (solBalance ?? 0)) {
        setAmount((solBalance ?? 0).toString())
      }
    } else {
      if (numAmount > (tokenBalance ?? 0)) {
        setAmount((tokenBalance ?? 0).toString())
      }
    }
  }, [amount, solBalance, activeTab])

  return (
    <>
      <div className="mb-6 rounded-lg p-4">
        <div className="relative flex items-center justify-between rounded-lg border border-[#FFFEEF] px-5 py-4">
          <div className="absolute left-5 top-0 mb-2 -translate-y-1/2 bg-[#07040B] px-2 text-xs font-bold text-accent">
            INPUT {activeTab.toUpperCase()} AMOUNT
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="bg-transparent text-white outline-none placeholder:text-[#605B66]"
            placeholder="0"
          />
          <div className="flex space-x-2">
            {activeTab === 'Buy' && (
              <>
                <button
                  onClick={() => handleQuickAmount(3)}
                  className="rounded-full border border-[#928E96] bg-transparent px-[6px] text-sm text-[#928E96]"
                >
                  3 {getChainShortName(Number(chainId))}
                </button>
                <button
                  onClick={() => handleQuickAmount(10)}
                  className="rounded-full border border-[#928E96] bg-transparent px-[6px] text-sm text-[#928E96]"
                >
                  10 {getChainShortName(Number(chainId))}
                </button>
                <button
                  onClick={() => handleQuickAmount(50)}
                  className="rounded-full border border-[#928E96] bg-transparent px-[6px] text-sm text-[#928E96]"
                >
                  50 {getChainShortName(Number(chainId))}
                </button>
              </>
            )}

            <button
              onClick={handleMaxAmount}
              className="rounded-full border border-[#928E96] bg-transparent px-[6px] text-sm text-[#928E96]"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-2 text-right text-sm text-[#999999]">
          <img src="/assets/img/icons/mingcute_wallet-line.svg" />
          {activeTab === 'Buy'
            ? `${solBalance ?? 0} ${getChainShortName(Number(chainId))}`
            : `${tokenBalance ?? 0} TOKEN`}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button
            borderColor="border-accent"
            className={
              'group relative h-[60px] w-[150px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[270px]'
            }
            disabled
          >
            <span className="relative z-10">
              Whale {activeTab.toLowerCase()}
            </span>
          </Button>
          <Button
            borderColor="border-white"
            className="group relative h-[60px] w-[150px] overflow-hidden rounded-none border border-white bg-transparent font-medium text-[#FFFAFF] md:w-[270px]"
          >
            <span className="relative z-10">Swap Bridge</span>
          </Button>
        </div>
        <Button
          borderColor="border-accent"
          className={
            'group relative h-[60px] w-[300px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[570px]'
          }
          onClick={() =>
            onSubmit({
              chainId: Number(chainId),
              sellBuyFlag: activeTab.toLowerCase(),
              tokenAddress,
              tokenQty: Number(amount),
            })
          }
          disabled={Number(amount) === 0} // Disable button if amount is zero
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
              <span className="relative z-10 ml-2">Processing...</span>
            </div>
          ) : (
            <span className="relative z-10">
              Quick {activeTab.toLowerCase()}
            </span>
          )}
        </Button>
      </div>
    </>
  )
}
