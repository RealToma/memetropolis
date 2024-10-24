import React from 'react'
import Link from "next/link";
import { GlobeIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

const PageTop = ({
  menuFlag,
  componentFlag,
  children,
}: {
  menuFlag: boolean
  componentFlag: boolean
  children: React.ReactNode
}) => {
  return (
    <div className="relative flex flex-col gap-6 border-[1.5px] border-[#866BDD]">
      <div className="flex justify-center">
        <img
          src="/assets/img/home/top/top-top-circles.svg"
          className="w-[200px] max-w-[1001px] md:w-full"
        />
      </div>

      {children}

      <div className="flex justify-center">
        <img
          src="/assets/img/home/top/top-bottom-circles.svg"
          className="w-[200px] max-w-[1064px] md:w-full"
        />
      </div>

      <div className="absolute left-[-50px] top-[-50px] z-[10] h-[100px] w-[100px] rotate-45 border-r border-r-[#866BDD] bg-background" />
      <div className="absolute right-[-50px] top-[-50px] z-[10] h-[100px] w-[100px] rotate-[135deg] border-r border-r-[#866BDD] bg-background" />

      <div className="absolute left-1/2 top-[-1px] h-[35px] w-[240px] -translate-x-1/2 md:h-[70px] md:w-[460px]">
        <div className="relative h-full w-full overflow-hidden">
          <div className="relative flex h-full w-full items-end justify-center border border-[#866BDD] border-t-background p-6">
            <div className="absolute bottom-[-26px] left-[-26px] z-[10] h-[52px] w-[52px] rotate-[315deg] border-r border-r-[#866BDD] bg-background" />
            <div className="absolute bottom-[-26px] right-[-26px] z-[10] h-[52px] w-[52px] rotate-[225deg] border-r border-r-[#866BDD] bg-background" />
          </div>
          {menuFlag && (
            <div className="absolute left-1/2 top-[0px] h-[30px] w-[220px] -translate-x-1/2 md:h-[60px] md:w-[440px]">
              <div className="h-full w-full overflow-hidden">
                <div className="relative flex h-full w-full items-center justify-around border border-accent p-3 text-xs md:p-6 md:text-base">
                  <p className="flex gap-2">
                    <img src="/assets/img/home/top/top-super-fwog.svg" />
                    SUPER FWOG
                  </p>
                  <p className="flex gap-1">
                    59.61%
                    <img src="/assets/img/home/top/top-arrow-up.svg" />
                  </p>
                  <p>$7.9M</p>
                  <div className="absolute bottom-[-10px] left-[6px] z-[10] h-[44px] w-[8px] rotate-[315deg] border-r border-r-accent bg-background" />
                  <div className="absolute bottom-[-10px] right-[6px] z-[10] h-[44px] w-[8px] rotate-[225deg] border-r border-r-accent bg-background" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-[-1px] left-[-1px] h-[190px] w-[90px] overflow-hidden">
        <div className="relative flex h-full w-full items-end justify-center border border-[#866BDD] border-b-background border-l-background p-6">
          <div className="absolute right-[-26px] top-[-26px] z-[10] h-[52px] w-[52px] rotate-[135deg] border-r border-r-[#866BDD] bg-background" />
        </div>
      </div>
      <div className="absolute bottom-[-1px] left-[-1px] h-[180px] w-[80px] overflow-hidden">
        <div className="relative flex h-full w-full items-end justify-center border border-accent p-6">
          {menuFlag && (
            <div className="absolute left-0 top-1/4 flex flex-col gap-2">
              <div className="h-2 w-[80px] bg-accent"></div>
              <div className="relative h-2 w-[80px] bg-accent">
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"></div>
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div>
              </div>
              <div className="h-2 w-[80px] bg-accent"></div>
            </div>
          )}
          <p className="text-sm font-semibold uppercase text-[#E7E7E8]">Menu</p>
          <div className="absolute right-[6px] top-[-10px] z-[10] h-[44px] w-[8px] rotate-[135deg] border-r border-r-accent bg-background" />
        </div>
      </div>

      <div className="absolute bottom-[-1px] right-[-1px] h-[190px] w-[90px] overflow-hidden">
        <div className="relative flex h-full w-full items-end justify-center border border-[#866BDD] border-b-background border-r-background p-6">
          <div className="absolute left-[-26px] top-[-26px] z-[10] h-[52px] w-[52px] rotate-[45deg] border-r border-r-[#866BDD] bg-background" />
        </div>
      </div>
      <div className="absolute bottom-[-1px] right-[-1px] h-[180px] w-[80px] overflow-hidden">
        <div className="relative flex h-full w-full flex-col items-end justify-around border border-accent p-6">
          {menuFlag && (
            <>
              <Link href="https://www.instagram.com/bookofdyor" target="_blank">
                <InstagramLogoIcon width={24} height={24} className="text-[#B5B3B8]" />
              </Link>
              <Link href="https://x.com/MEMETR0P0LIS" target="_blank">
                <img src="/assets/img/home/top/top-icon-x.svg" />
              </Link>
              <Link href="https://memetropolis.party" target="_blank">
                <GlobeIcon width={24} height={24} className="text-[#B5B3B8]" />
              </Link>
            </>
          )}
          <div className="absolute left-[6px] top-[-10px] z-[10] h-[44px] w-[8px] rotate-[45deg] border-r border-r-accent bg-background" />
        </div>
      </div>
    </div>
  )
}

export default PageTop
