import { useState } from "react";
import { Button } from "@/components/ui/button";

const SkinFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')

  return (
    <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
      <div className="flex justify-center gap-3">
        <p
          className={` ${selectedFilter === 'all' ? 'bg-accent text-[#07040B]' : 'bg-transparent text-[#F3F3F3]'} cursor-pointer border border-accent px-6 py-3`}
          onClick={() => setSelectedFilter('all')}
        >
          All
        </p>
        <p
          className={` ${selectedFilter === 'bots' ? 'bg-accent text-[#07040B]' : 'bg-transparent text-[#F3F3F3]'} cursor-pointer border border-accent px-6 py-3`}
          onClick={() => setSelectedFilter('bots')}
        >
          Bots
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <p
          className={` ${selectedFilter === 'mouse_pack' ? 'bg-accent text-[#07040B]' : 'bg-transparent text-[#F3F3F3]'} cursor-pointer border border-accent px-6 py-3`}
          onClick={() => setSelectedFilter('mouse_pack')}
        >
          Mouse_Pack
        </p>
        <p
          className={` ${selectedFilter === 'portals' ? 'bg-accent text-[#07040B]' : 'bg-transparent text-[#F3F3F3]'} cursor-pointer border border-accent px-6 py-3`}
          onClick={() => setSelectedFilter('portals')}
        >
          Portals
        </p>
      </div>
    </div>
  )
}
const SkinBox = () => {
  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-end justify-between gap-8">
        <p className="text-lg font-semibold md:text-3xl">New Skin</p>
        <p className="text-xs text-[#B5B3B8] md:text-sm">
          Crypto ipsum bitcoin ethereum.
        </p>
      </div>
      <img src="/assets/img/launch-token/skin.svg" />
      <div className="absolute bottom-0 left-1/2 w-1/2 -translate-x-1/2 translate-y-2/3">
        <Button
          borderColor="border-[#413B48]"
          className={
            'group relative h-[40px] w-full overflow-hidden rounded-none border border-[#413B48] bg-[#413B48] font-medium text-[#FFFAFF]'
          }
        >
          <span className="relative z-10">Buy Now</span>
        </Button>
      </div>
    </div>
  )
}
export const Skin = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-12 overflow-hidden px-3">
      <div className="relative flex w-full flex-col gap-7 border-l-2 border-r-2 border-accent bg-primary px-8 pb-16 pt-4 md:pb-32 md:pt-8">
        <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"></div>
        <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent"></div>

        <SkinFilters />
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          <SkinBox />
          <SkinBox />
          <SkinBox />
          <SkinBox />
          <SkinBox />
          <SkinBox />
        </div>
        <div className="absolute bottom-0 left-1/2 h-[30px] w-[50%] -translate-x-1/2 bg-background md:h-[70px]"></div>
        <div className="absolute bottom-[-36px] left-[calc(25%-3px)] h-[55px] w-[55px] -translate-x-1/2 rotate-[50deg] bg-background md:bottom-[-64px] md:left-[calc(25%-7px)] md:h-[110px] md:w-[110px]"></div>
        <div className="absolute bottom-[-36px] left-[calc(75%+3px)] h-[55px] w-[55px] -translate-x-1/2 rotate-[130deg] bg-background md:bottom-[-64px] md:left-[calc(75%+7px)] md:h-[110px] md:w-[110px]"></div>
        <img
          src="/assets/img/home/trading-chat-square-left.svg"
          className="absolute bottom-0 left-0"
        />
        <img
          src="/assets/img/home/trading-chat-square-right.svg"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  )
}
