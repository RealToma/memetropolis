'use client'

import {
  RiArrowDownSLine,
} from '@remixicon/react'
import { useState } from 'react'

import Link from 'next/link'

import { useWallet } from '@/core/hooks/use-wallet'
import { Web3Wallet } from '@/core/types/web3'

import { useConnectWalletModalState } from '../connect-wallet'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { shortenAddress } from "@/core/utils";

export function UserWallets() {
  const [open, onOpenChange] = useState(false)

  const { wallets, disconnect } = useWallet()
  const onOpenConnectWallet = useConnectWalletModalState((s) => s.onOpenChange)

  if (!wallets[0]) return null

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Open wallet details"
          className="flex h-[inherit] w-[250px] justify-between gap-2 rounded-full bg-[#0F0918] px-2"
        >
          <img src="/assets/img/menu-profile/mock-profile.svg" />
          <p className="flex flex-col items-start justify-start">
            <span>User 33291</span>
            <span className="hidden text-[#B5B3B8] sm:block">
              {shortenAddress(wallets[0].address, 6, 8)}
            </span>
          </p>
          <RiArrowDownSLine />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="ml-4 w-[220px] space-y-1 overflow-hidden border-none bg-[#0F0918] px-4 py-3"
      >
        {/* <span className="p-2">Connected Wallets</span> */}

        {/* {wallets.map(({ connector, displayName, provider }) => {
          return (
            <div
              className="flex h-10 items-center gap-2"
              key={`wallet-${provider}`}
            >
              <span className="flex-1">{displayName}</span>
              <button
                type="button"
                className="flex items-center justify-center"
                onClick={() => disconnect(provider as Web3Wallet.Providers)}
              >
                <RiLogoutCircleRLine className="text-state-error size-4" />
              </button>
            </div>
          )
        })} */}

        <Link href="/profile">
          <Button className="w-full gap-2 border-0 bg-transparent p-0">
            <img src="/assets/img/menu-profile/mingcute_user-3-fill.svg" />
            <span className="inline-block flex-1 text-start">Profile</span>
          </Button>
        </Link>

        <Button
          className="w-full gap-2 border-0 bg-transparent p-0"
          onClick={() => onOpenConnectWallet(true)}
        >
          <img src="/assets/img/menu-profile/icons_reload.svg" />
          <span className="inline-block flex-1 text-start">Change wallet</span>
        </Button>

        <Button
          className="w-full gap-2 border-0 bg-transparent p-0"
          onClick={() =>
            disconnect(wallets[0].provider as Web3Wallet.Providers)
          }
        >
          <img src="/assets/img/menu-profile/log-out-outline.svg" />
          <span className="inline-block flex-1 text-start text-[#FF4949]">
            Log out
          </span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
