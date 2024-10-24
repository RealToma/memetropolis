'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useConnectWalletModalState } from '@/components/layout/connect-wallet'
import { UserWallets } from '@/components/layout/header/user-wallets'
import { useWallet } from '@/core/hooks/use-wallet'

const NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Profile',
    href: '/profile',
  },
  // {
  //   label: 'Launchpad',
  //   href: '/launch-token',
  // },
]

export function Header() {
  const { isConnected } = useWallet()

  const onOpenWalletConnectChange = useConnectWalletModalState(
    (s) => s.onOpenChange,
  )

  return (
    <header className="absolute top-0 w-full bg-[#07040B] px-3 md:px-10">
      <div className="relative mx-auto max-w-[1300px]">
        <div className="absolute bottom-0 left-0 h-[2px] w-[326px] bg-accent"></div>
        <div className="absolute bottom-[-3px] left-[326px] flex h-[8px] w-[8px] items-center justify-center rounded-full bg-accent">
          <div className="h-1 w-1 rounded-full bg-primary"></div>
        </div>

        <div className="max-w-content flex items-center justify-between gap-2 py-5 md:gap-6">
          <Link
            href="/"
            className="mr-3 flex items-center font-hanson text-base text-white md:mr-6 md:text-2xl"
          >
            <Image src={'/logo.png'} alt="logo" width={48} height={48} />
            EMETROPOLIS
          </Link>

          {NAV_LINKS.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hidden text-sm text-[#EEEEEE] md:block"
            >
              {item.label}
            </Link>
          ))}

          <Link href="/launch-token" className="hidden md:block">
            <Button
              borderColor="border-accent"
              className={
                'group relative h-[60px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[280px]'
              }
            >
              <span className="relative z-10">Launch meme</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex gap-2">
                <UserWallets />
              </div>
            ) : (
              <Button
                borderColor="border-accent"
                onClick={() => onOpenWalletConnectChange(true)}
                className="h-[60px] w-[150px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[200px]"
              >
                Connect wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
