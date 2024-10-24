import { Button } from '@/components/ui/button'
import React from 'react'

export const ReferFriendSection = () => {
  return (
    <div className="flex w-full flex-col items-center gap-8 bg-[url('/assets/img/profile/refer-friend/background.png')] bg-cover p-24 text-white">
      <div className="relative flex flex-col items-center justify-center gap-2">
        <img
          src="/assets/img/profile/refer-friend/$.svg"
          className="absolute left-[-60px] top-[-20px]"
        />
        <img
          src="/assets/img/profile/refer-friend/ribbon.svg"
          className="absolute right-[-50px] top-[-25px]"
        />

        <h2 className="text-center font-hanson text-xl font-bold md:text-4xl">
          REFER FRIEND &{' '}
          <span className="bg-gradient-to-tr from-[#FFFAC8] to-[#FFF05A] bg-clip-text text-transparent">
            EARN
          </span>
        </h2>
        <p className="text-gray-400">
          Invite friends to join Memetropolis and earn rewards!
        </p>
      </div>

      <Button
        borderColor="border-accent"
        className={
          'group relative h-[40px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:h-[60px] md:w-[380px]'
        }
      >
        Invite a friend
      </Button>
    </div>
  )
}
