import { useQueries } from '@tanstack/react-query'
import ProjectCard from '@/app/_components/project-card'
import { getTokenListByCategory } from '@/core/services/_api/use-token'
import { Token } from '@/core/types/token'

const CATEGORIES = [
  {
    title: 'Hot',
    value: 'hot',
    color: '#D16235',
    icon: 'spotlights-hot.svg',
  },
  {
    title: 'New',
    value: 'new',
    color: '#00C2FF',
    icon: 'spotlights-new.svg',
  },
  {
    title: 'Top mcap',
    value: 'top',
    color: '#77FB77',
    icon: 'spotlights-top-mcap.svg',
  },
  {
    title: 'Top Chain',
    value: 'chain',
    color: '#FFF37B',
    icon: 'spotlights-top-chain.svg',
  },
]

export const TrendingMeta = () => {
  const tokenQueries = useQueries({
    queries: CATEGORIES.map((category) => ({
      ...getTokenListByCategory(category.value),
      queryKey: ['trending-meta', category.value],
    })),
  })

  const isLoading = tokenQueries.some((query) => query.isLoading)
  const tokensByCategory = tokenQueries.reduce(
    (acc, query, index) => {
      acc[CATEGORIES[index].value] = query.data || []
      return acc
    },
    {} as Record<string, Token[]>,
  )

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#FFFAFF]"></div>
      </div>
    )
  }

  return (
    <>
      <h1 className="relative text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Trending Meta
        {['-scale-x-100', ''].map((transform, index) => (
          <img
            key={index}
            src="/assets/img/launch-token/start-with-the-info/title-ribbon.svg"
            className={`absolute ${index === 0 ? 'right' : 'left'}-[-70px] top-[-60px] ${transform}`}
          />
        ))}
      </h1>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">
        {CATEGORIES.map(({ title, color, icon, value }) => (
          <div key={title}>
            <p className="mb-4 flex gap-2" style={{ color }}>
              <img src={`/assets/img/home/spotlights/${icon}`} alt={title} />
              {title}
            </p>
            <div className="flex flex-col gap-4">
              {(tokensByCategory[value] || [])
                .slice(0, 5)
                .map((token, index) => (
                  <ProjectCard
                    key={token.address}
                    hoverUrl={`/assets/img/home/projects/hover-${value}.png`}
                    token={token}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
