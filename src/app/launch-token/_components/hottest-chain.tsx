import ProjectCard from '@/app/_components/project-card'

export const hottestChainMockData = {
  address: 'vNFwZh1AwiECwmimr1nfn6G13SNcXcjHKJ7oohVaGVp',
  burnCount: '0',
  chainId: 999,
  currentHolderCount: '1',
  decimals: 9,
  description: null,
  image: '/assets/img/home/spotlights/spotlights-img.svg',
  mintCount: '1',
  name: 'AAA',
  owner: '6k1kKUqcNo5ccsn128KUjZxvFFyhiqe9Au3Zv8AKraYg',
  priceInDecimal: '0',
  symbol: 'AAA',
  totalSupply: '1000000000000000',
  transferCount: '0',
}

export const HottestChain = () => {
  return (
    <>
      <h1 className="relative text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Hottest Chain
        <img
          src="/assets/img/launch-token/hottest-chain/title-ribbon.svg"
          className="absolute left-[-70px] top-[-60px]"
        />
      </h1>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {Array(12)
          .fill(hottestChainMockData)
          .map((constant, index) => {
            return (
              <ProjectCard
                key={index}
                hoverUrl="hover-hot.png"
                token={constant}
              />
            )
          })}
      </div>
    </>
  )
}
