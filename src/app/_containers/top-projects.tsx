import { useQuery } from '@tanstack/react-query'
import { getTokenList } from '@/core/services/_api/use-token'

import DropdownChain from '@/app/_components/dropdown-chain'
import DropdownCategory from '@/app/_components/dropdown-category'
import ProjectPortal from '@/app/_components/project-portal'

const TopProjects = () => {
  const { data: tokens, isLoading } = useQuery(getTokenList())

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#FFFAFF]"></div>
      </div>
    )
  }

  const projectPositions = [
    { left: '16%', top: '50%', yOffset: -29, mdYOffset: -88 },
    { left: '32%', top: '50%', yOffset: -16, mdYOffset: -48 },
    { left: '48%', top: '50%', yOffset: -36, mdYOffset: -108 },
    { left: '64%', top: '50%', yOffset: -23, mdYOffset: -68 },
    { left: '80%', top: '50%', yOffset: -39, mdYOffset: -118 },
  ]

  const getPositionStyle = (
    index: number,
    xOffset: number = 7,
    mdXOffset: number = 20,
  ) => ({
    left: `calc(${projectPositions[index].left} + ${xOffset}px)`,
    top: `calc(${projectPositions[index].top} + ${projectPositions[index].yOffset}px)`,
    '@media (minWidth: 768px)': {
      left: `calc(${projectPositions[index].left} + ${mdXOffset}px)`,
      top: `calc(${projectPositions[index].top} + ${projectPositions[index].mdYOffset}px)`,
    },
  })

  return (
    <>
      <h1 className="relative text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Top projects
        <img
          src="/assets/img/home/projects/title-ribbon.svg"
          className="absolute left-[-70px] top-[-60px]"
        />
        <img
          src="/assets/img/home/projects/title-ribbon.svg"
          className="absolute right-[-70px] top-[-60px] -scale-x-100"
        />
      </h1>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <DropdownChain />
        <DropdownCategory />
      </div>

      {[1, 2, 3].map((layer) => (
        <div key={layer} className="relative w-full">
          <img
            src={`/assets/img/home/projects/projects-layer-${layer}.svg`}
            className="w-full"
          />
          {projectPositions.map((_, index) => {
            const tokenIndex = (layer - 1) * 5 + index
            return (
              <div
                key={index}
                className="absolute"
                style={getPositionStyle(
                  index,
                  layer === 2 ? -13 : layer === 3 ? -3 : 7,
                  layer === 2 ? -40 : layer === 3 ? -10 : 20,
                )}
              >
                {tokens && tokenIndex < tokens.length && (
                  <ProjectPortal
                    projectUrl={`projects-icon-${(tokenIndex % 6) + 1}.svg`}
                    tokenSymbol={tokens[tokenIndex].symbol}
                    tokenAddress={tokens[tokenIndex].address}
                    chainId={tokens[tokenIndex].chainId}
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}

export default TopProjects
