import CopyButton from '@/app/profile/_components/copy-button'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useWallet } from '@/core/hooks/use-wallet'
import { shortenAddress } from '@/core/utils'

export const ProfileSummary = () => {
  const { wallets, isConnected } = useWallet()

  return (
    <div className="relative mt-[200px] flex w-full flex-col gap-6 border-l-2 border-accent bg-primary py-16 text-white md:py-28">
      <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"></div>

      <div className="absolute left-[50px] top-0 h-[40px] w-[124px] -translate-y-1/2 rounded-full bg-background"></div>
      <div className="absolute left-[55px] top-0 flex h-[34px] w-[114px] -translate-y-1/2 items-center justify-around rounded-full bg-[url('/assets/img/profile/summary/social-background.png')] bg-cover">
        <a href="#">
          <img src="/assets/img/profile/summary/icons_facebook-fill.svg" />
        </a>
        <a href="#">
          <img src="/assets/img/profile/summary/icons_x.svg" />
        </a>
        <a href="#">
          <img src="/assets/img/profile/summary/icons_linkedin.svg" />
        </a>
      </div>

      <div className="absolute left-1/2 top-0 h-[33%] w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background"></div>
      <img
        src="/assets/img/profile/summary/avatar.svg"
        className="absolute left-1/2 top-0 w-[18%] -translate-x-1/2 -translate-y-[calc(50%-15px)]"
      />

      <div className="absolute right-0 top-0 flex -translate-y-1/2 items-center gap-6 bg-[url('/assets/img/profile/summary/wallet-address-bg.png')] bg-cover p-2 pl-16">
        <div>
          <span className="flex gap-2 text-lg font-semibold">
            <img src="/assets/img/profile/summary/icons_wallet.svg" />
            Wallet address
          </span>
          <span className="flex items-center gap-1">
            <img src="/assets/img/profile/summary/token_solana.svg" />
            {isConnected ? shortenAddress(wallets[0].address) : 'Not Connected'}
          </span>
        </div>
        <CopyButton textToCopy={isConnected ? wallets[0].address : ''} />
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h1 className="flex items-center gap-[10px] text-2xl font-semibold">
          Mickle fox{' '}
          <span className="flex gap-2 rounded-full border bg-[#928E9633] px-2 py-1 text-xs font-bold">
            <img src="/assets/img/profile/summary/token_ponke.svg" />
            $PONKE
          </span>
        </h1>
        <p className="flex gap-2 text-[#B5B3B8]">
          @mickle{' '}
          <img
            src="/assets/img/profile/summary/icons_copy.svg"
            className="cursor-pointer"
          />
        </p>
      </div>

      <div className="flex justify-center space-x-6">
        <div className="text-center">
          <div className="font-medium">4500</div>
          <div className="text-sm text-[#E8E8E8]">Followers</div>
        </div>
        <div className="text-center">
          <div className="font-medium">1134</div>
          <div className="text-sm text-[#E8E8E8]">Following</div>
        </div>
        <div className="text-center">
          <div className="font-medium">1134</div>
          <div className="text-sm text-[#E8E8E8]">Likes</div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Button
          borderColor="border-accent"
          className={
            'group relative h-[40px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent md:h-[60px] md:w-[380px]'
          }
        >
          <span className="relative z-10 font-medium text-[#110A1A]">
            + Follow
          </span>
        </Button>

        <p className="text-sm text-[#B5B3B8]">
          My name is mickle and I am a crypto enthusiast.
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 h-[120px] w-[120px] -translate-x-1/2 translate-y-1/2 rounded-3xl bg-background"></div>
      <img
        src="/assets/img/profile/summary/qr-code.svg"
        alt="QR Code"
        className="absolute bottom-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2 translate-y-1/2"
      />

      <img
        src="/assets/img/home/trading-chat-square-right.svg"
        className="absolute bottom-0 right-0"
      />
    </div>
  )
}
