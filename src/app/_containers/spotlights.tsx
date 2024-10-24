import { useQueries } from '@tanstack/react-query'
import ProjectCard from '@/app/_components/project-card'
import { getTokenListByCategory } from '@/core/services/_api/use-token'
import { Token } from '@/core/types/token'

const CATEGORIES = [
  {
    name: 'Hot',
    value: 'hot',
    color: '#D16235',
    icon: '/assets/img/home/spotlights/spotlights-hot.svg',
    hoverBgGradient: '/assets/img/home/projects/hover-hot.png',
  },
  {
    name: 'New',
    value: 'new',
    color: '#00C2FF',
    icon: '/assets/img/home/spotlights/spotlights-new.svg',
    hoverBgGradient: '/assets/img/home/projects/hover-new.png',
  },
  {
    name: 'Top mcap',
    value: 'top',
    color: '#77FB77',
    icon: '/assets/img/home/spotlights/spotlights-top-mcap.svg',
    hoverBgGradient: '/assets/img/home/projects/hover-top.png',
  },
]

const Spotlights = () => {
  const tokenQueries = useQueries({
    queries: CATEGORIES.map((category) => ({
      ...getTokenListByCategory(category.value),
      queryKey: ['tokens', category.value],
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
    <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-16 px-3">
      <h1 className="relative text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Spotlights
        <img
          src="/assets/img/home/spotlights/title-ribbon.svg"
          className="absolute left-[-70px] top-[-60px]"
        />
      </h1>

      <div className="flex flex-col gap-8">
        {CATEGORIES.map((category) => (
          <CategorySection
            key={category.value}
            category={category}
            tokens={tokensByCategory[category.value] || []}
          />
        ))}
      </div>
    </div>
  )
}

type CategorySectionProps = {
  category: {
    name: string
    value: string
    color: string
    icon: string
    hoverBgGradient: string
  }
  tokens: Token[]
}

const CategorySection = ({ category, tokens }: CategorySectionProps) => {
  return (
    <div>
      <p className="mb-2 flex gap-2" style={{ color: category.color }}>
        <img src={category.icon} alt={`${category.name} icon`} />
        {category.name}
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {tokens.map((token) => (
          <ProjectCard
            key={token.address}
            hoverUrl={category.hoverBgGradient} // You might want to add this property to the Token type if available
            token={token}
          />
        ))}
      </div>
    </div>
  )
}

export default Spotlights
