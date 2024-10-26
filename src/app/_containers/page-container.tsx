'use client'

import Link from 'next/link'

import PageTop from '../launch-token/_components/page-top'
import NewsletterBox from '../launch-token/_components/newsletter-box'
import Spotlights from './spotlights'
import TradingChat from './trading-chat'
import TopTraders from './top-traders'
import TopProjects from './top-projects'

import { Button } from '@/components/ui/button'

import AutocompleteSearchToken from '@/app/_components/autocomplete-search-token'
import TradingChart from '@/app/_components/trading-chart'
// import BubbleMap from "@/app/_components/bubble-map";
import DropdownSort from '@/app/_components/dropdown-sort'

import ButtonSendEmail from '../_components/button-send-email'

const Charts = () => {
  return (
    <>
      <h1 className="text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Charts
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="relative w-full md:w-[660px]">
          <AutocompleteSearchToken />
          {/* <input type="text" placeholder='Search token' className='bg-secondary pl-12 pr-6 py-3 w-full outline-none' /> */}
          <img
            src="/assets/img/home/charts/chart-search.svg"
            className="absolute left-4 top-[14px]"
          />
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-accent"></div>
        </div>
        <DropdownSort />
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-2">
        <TradingChart />
        <TradingChart />
        <TradingChart />
        <TradingChart />
      </div>
    </>
  )
}

const Newsletter = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-6 px-3">
      <div className="flex w-full flex-col gap-3 md:flex-row">
        <NewsletterBox
          borderFlag="top-right"
          bgSrc="/assets/img/home/crypto-news.svg"
          alignFlag="end"
        >
          <p className="text-lg font-semibold text-white md:text-3xl">
            Crypto news
          </p>
        </NewsletterBox>
        <NewsletterBox
          borderFlag="top-left"
          bgSrc="/assets/img/home/crypto-contests.svg"
          alignFlag="end"
        >
          <p className="text-lg font-semibold text-white md:text-3xl">
            Crypto Contests
          </p>
        </NewsletterBox>
      </div>
      <NewsletterBox>
        <p className="text-center font-hanson text-xl font-bold uppercase text-white md:text-4xl">
          Sign up for the
          <br />
          crypto newsletter
        </p>
        <p className="text-center text-xs md:text-base">
          Get updates for news, coins, contests, pre-access and much more.
        </p>
        <div className="relative w-full max-w-[470px]">
          <input
            placeholder="Enter your email"
            className="w-full rounded-lg border border-violet-100 bg-transparent px-6 py-3 text-xs text-white md:text-base"
          />
          <ButtonSendEmail />
        </div>
      </NewsletterBox>
    </div>
  )
}

const HomePageContainer = () => {
  return (
    <main className="flex h-full w-full flex-col items-center justify-between gap-10 pb-10 pt-28 md:gap-36 md:pb-28 2xl:gap-52 2xl:pt-40">
      <div className="relative w-full">
        <div className="absolute bottom-0 left-1/2 z-[10] h-24 w-24 -translate-x-1/2 translate-y-1/2 rounded-full border border-[#866BDD] bg-background">
          <img src="/assets/img/home/top/top-new-arrow.svg" />
        </div>

        <section className="mx-auto w-full max-w-[1300px] overflow-hidden px-3">
          <PageTop menuFlag={true} componentFlag={true}>
            <h1 className="text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
              Memetropolis
            </h1>
            <p className="text-center font-hanson text-lg uppercase md:text-3xl">
              Where memes mint{' '}
              <span className="text-accent">millionaires!</span>
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Link href="/launch-token">
                <Button
                  borderColor="border-accent"
                  className={
                    'group relative h-[60px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A] md:w-[380px]'
                  }
                >
                  <span className="relative z-10">Launch meme</span>
                </Button>
              </Link>
              <Button
                borderColor="border-white"
                className="h-[60px] w-[200px] rounded-none border border-white bg-transparent font-medium text-[#FFFAFF] md:w-[380px]"
              >
                Track meme
              </Button>
            </div>
          </PageTop>
        </section>
      </div>

      <section className="mx-auto flex w-full max-w-full flex-col items-center gap-16 px-3">
        <TopProjects />
      </section>

      <section
        className="mx-auto flex w-full max-w-[1300px] flex-col gap-16 px-3 pb-10 md:pb-36 2xl:pb-52"
        style={{ background: 'url(/assets/img/home/charts/background.svg)' }}
      >
        <Charts />
      </section>

      <section className="mx-auto -mt-10 flex w-full max-w-[1300px] flex-col gap-16 px-3 md:-mt-36 2xl:-mt-52">
        <TradingChat />
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

      <section className="mx-auto flex w-full max-w-[1300px] flex-col items-center gap-16 px-3">
        <TopTraders />
      </section>

      <section className="relative w-full">
        <img
          src="/assets/img/home/newsletter/bg-ribbon.svg"
          className="absolute right-0 top-0 h-[280px] w-[269px] -translate-y-1/2"
        />
        <img
          src="/assets/img/home/newsletter/bg-ribbon.svg"
          className="absolute bottom-0 left-0 h-[280px] w-[269px] translate-y-1/2 rotate-[180deg]"
        />
        <Newsletter />
      </section>
    </main>
  )
}

export default HomePageContainer
