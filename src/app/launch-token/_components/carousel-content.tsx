const CarouselBox = () => {
  return (
    <div className="absolute left-1/2 top-[-1px] h-[35px] w-[240px] -translate-x-1/2 md:h-[70px] md:w-[460px]">
      <div className="relative h-full w-full overflow-hidden">
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
              <div className="absolute bottom-[-22px] left-[-22px] z-[10] h-[44px] w-[44px] rotate-[315deg] border-r border-r-accent bg-background" />
              <div className="absolute bottom-[-22px] right-[-22px] z-[10] h-[44px] w-[44px] rotate-[225deg] border-r border-r-accent bg-background" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CarouselContent = () => {
  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-4 md:max-w-[1380px] md:flex-row">
      <div className="relative h-[35px] w-[240px] md:h-[70px] md:w-[460px]">
        <CarouselBox />
      </div>
      <div className="relative h-[35px] w-[240px] md:h-[70px] md:w-[460px]">
        <CarouselBox />
      </div>
      <div className="relative h-[35px] w-[240px] md:h-[70px] md:w-[460px]">
        <CarouselBox />
      </div>
    </div>
  )
}

export default CarouselContent
