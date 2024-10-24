'use client'

import CarouselContent from '@/app/launch-token/_components/carousel-content'
import PageTop from '@/app/launch-token/_components/page-top'
import TokenCreationForm from '@/app/launch-token/_components/token-creation-form'
import { TrendingMeta } from '@/app/launch-token/_components/trending-meta'
import { HottestChain } from '@/app/launch-token/_components/hottest-chain'
import { Newsletter } from '@/app/launch-token/_components/news-letter'
import { Skin } from '@/app/launch-token/_components/skin'

const LaunchTokenPageContainer = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <main className="flex h-full w-full flex-col items-center justify-between gap-10 overflow-x-hidden pb-10 pt-28 md:gap-36 md:pb-28 2xl:gap-52 2xl:pt-40">
      <div className="relative flex w-full flex-col gap-8 md:gap-16">
        <CarouselContent />

        <section className="mx-auto w-full max-w-[1300px] overflow-hidden px-3">
          <PageTop menuFlag={false} componentFlag={false}>
            <h1 className="h-[150px] text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
              Launch Token
            </h1>
          </PageTop>
        </section>

        <CarouselContent />
      </div>

      <div className="relative flex w-full flex-col gap-16">
        <img
          src="/assets/img/home/spotlights/bg-gradient-effect-tr.svg"
          className="absolute right-0 top-0 h-[494px] w-[439px] -translate-y-1/2"
        />
        <img
          src="/assets/img/home/spotlights/bg-gradient-effect-bl.svg"
          className="absolute bottom-0 left-0 h-[494px] w-[439px] translate-y-1/2"
        />

        <section className="mx-auto flex w-full max-w-[1300px] flex-col items-center gap-12 px-3">
          <TokenCreationForm />
        </section>
        <CarouselContent />
      </div>

      <section className="mx-auto flex w-full max-w-[1348px] flex-col items-center gap-16 px-3">
        <TrendingMeta />
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
        <Skin />
      </section>

      <section className="mx-auto flex w-full max-w-[1348px] flex-col items-center gap-16 px-3">
        <HottestChain />
      </section>

      <section className="mx-auto flex w-full max-w-[1300px] flex-col gap-6 px-3">
        <Newsletter />
      </section>
    </main>
  )
}

export default LaunchTokenPageContainer
