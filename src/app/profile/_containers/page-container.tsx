'use client'

import React from 'react'

import ProfileDetails from './profile-details'
import { ProfileSummary } from '@/app/profile/_containers/profile-summary'
import { ReferFriendSection } from '@/app/profile/_containers/refer-friend-section'

import { useWallet } from '@/core/hooks/use-wallet'

const ProfilePageContainer = () => {
  const { isConnected } = useWallet()

  return (
    <>
      {!isConnected ? (
        <div className="flex h-[calc(100dvh-217px)] items-center justify-center">
          <p className="text-6xl">Connect Wallet to Continue</p>
        </div>
      ) : (
        <main className="flex h-full w-full flex-col items-center justify-between gap-20 pb-10 pt-28 md:gap-36 md:pb-28 2xl:gap-52 2xl:pt-40">
          <section className="mx-auto flex w-full max-w-[1300px] flex-col items-center gap-16 px-3">
            <ProfileSummary />
          </section>

          <section className="mx-auto flex w-full max-w-[1300px] flex-col items-center gap-16 px-3">
            <ProfileDetails />
          </section>

          <section className="mx-auto flex w-full max-w-[1300px] flex-col items-center gap-16 px-3">
            <ReferFriendSection />
          </section>
        </main>
      )}
    </>
  )
}

export default ProfilePageContainer
