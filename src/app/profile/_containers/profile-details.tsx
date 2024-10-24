import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getAccountRecentTokens } from '@/core/services/_api/use-account'
import { useWallet } from '@/core/hooks/use-wallet'

const RecentTokensContent = () => {
  const { wallets } = useWallet()
  const { data: tokens, isLoading } = useQuery(
    getAccountRecentTokens(wallets[0].address),
  )

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#FFFAFF]"></div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm font-normal text-[#999999]">
            <th className="py-2">Name</th>
            <th>PnL</th>
            <th>Marketcap</th>
            <th>Volume Total</th>
            <th>Volume average Per Trade</th>
            <th>---</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>
          {tokens?.map((token, index) => (
            <tr key={index} className="text-[#FFFAFF]">
              <td className="flex gap-2 py-3">
                <img src="/assets/img/profile/details/token_ponke.svg" />
                {token.name}
              </td>
              <td className="text-[#00FFA3]">0</td>
              <td>0</td>
              <td>${token.volumeTotal}</td>
              <td>${token.volumeAveragePerTrade}</td>
              <td>--</td>
              <td>--</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RecentTokensEmptyContent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <img src="/assets/img/profile/details/content_recent_tokens.svg" />
      <p className="text-base font-semibold md:text-2xl">No recent tokens</p>
      <p className="text-[#928E96]">Invest in a memecoin to view it here.</p>
      <Button
        borderColor="border-accent"
        className={
          'group relative h-[60px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent md:w-[380px]'
        }
      >
        <span className="relative z-10 font-medium text-[#110A1A]">
          Find a community
        </span>
      </Button>
    </div>
  )
}

const CommunityContent = () => {
  return <></>
}

const CommunityEmptyContent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <img src="/assets/img/profile/details/content_community.svg" />
      <p className="text-base font-semibold md:text-2xl">No communities</p>
      <p className="text-[#928E96]">You have not joined any community yet.</p>
      <Button
        borderColor="border-accent"
        className={
          'group relative h-[60px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent md:w-[380px]'
        }
      >
        <span className="relative z-10 font-medium text-[#110A1A]">
          Find a community
        </span>
      </Button>
    </div>
  )
}

const TokenLibraryContent = () => {
  return <></>
}

const TokenLibraryEmptyContent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <img src="/assets/img/profile/details/content_token_library.svg" />
      <p className="text-base font-semibold md:text-2xl">
        Token library is empty
      </p>
      <p className="text-[#928E96]">
        You have no tokens in your token library.
      </p>
      <Button
        borderColor="border-accent"
        className={
          'group relative h-[60px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent md:w-[380px]'
        }
      >
        <span className="relative z-10 font-medium text-[#110A1A]">
          Get started
        </span>
      </Button>
    </div>
  )
}

const RewardsBadgesContent = () => {
  return <></>
}

const RewardsBadgesEmptyContent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <img src="/assets/img/profile/details/content_rewards_badges.svg" />
      <p className="text-base font-semibold md:text-2xl">No rewards & badges</p>
      <p className="text-[#928E96]">
        Start trading to earn rewards, badges and more.
      </p>
      <Button
        borderColor="border-accent"
        className={
          'group relative h-[60px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent md:w-[380px]'
        }
      >
        <span className="relative z-10 font-medium text-[#110A1A]">
          Get started
        </span>
      </Button>
    </div>
  )
}

const FollowedTradersContent = () => {
  return <></>
}

const FollowedTradersEmptyContent = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <img src="/assets/img/profile/details/content_followed_traders.svg" />
      <p className="text-base font-semibold md:text-2xl">No followed traders</p>
      <p className="text-[#928E96]">
        Follow popular traders and learn from insights.
      </p>
      <Button
        borderColor="border-accent"
        className={
          'group relative h-[60px] w-[200px] overflow-hidden rounded-none border border-accent bg-accent md:w-[380px]'
        }
      >
        <span className="relative z-10 font-medium text-[#110A1A]">
          Start adding
        </span>
      </Button>
    </div>
  )
}

type TabId =
  | 'recent_tokens'
  | 'community'
  | 'token_library'
  | 'rewards_badges'
  | 'followed_traders'

interface TabContent {
  Content: React.FC
  EmptyContent: React.FC
  icon: string
  title: string
}

const tabContents: Record<TabId, TabContent> = {
  recent_tokens: {
    Content: RecentTokensContent,
    EmptyContent: RecentTokensEmptyContent,
    icon: '/assets/img/profile/details/icon_recent_tokens',
    title: 'Recent tokens',
  },
  community: {
    Content: CommunityContent,
    EmptyContent: CommunityEmptyContent,
    icon: '/assets/img/profile/details/icon_community',
    title: 'Community',
  },
  token_library: {
    Content: TokenLibraryContent,
    EmptyContent: TokenLibraryEmptyContent,
    icon: '/assets/img/profile/details/icon_token_library',
    title: 'Token library',
  },
  rewards_badges: {
    Content: RewardsBadgesContent,
    EmptyContent: RewardsBadgesEmptyContent,
    icon: '/assets/img/profile/details/icon_rewards_badges',
    title: 'Rewards & Badges',
  },
  followed_traders: {
    Content: FollowedTradersContent,
    EmptyContent: FollowedTradersEmptyContent,
    icon: '/assets/img/profile/details/icon_followed_traders',
    title: 'Followed traders',
  },
}

interface TabButtonProps {
  id: TabId
  selectedTab: TabId
  onClick: (id: TabId) => void
  title: string
  icon: string
}

const TabButton: React.FC<TabButtonProps> = ({
  id,
  selectedTab,
  onClick,
  title,
  icon,
}) => (
  <h2
    className={`flex min-w-[180px] cursor-pointer gap-2 whitespace-nowrap px-6 py-2 font-medium ${
      selectedTab === id
        ? "border-b-2 border-accent bg-[url('/assets/img/profile/details/tab-selected-background.png')] bg-cover text-accent"
        : 'text-white'
    }`}
    onClick={() => onClick(id)}
  >
    <img
      src={`${icon}${selectedTab === id ? '_selected' : ''}.svg`}
      alt={title}
    />
    {title}
  </h2>
)

const ProfileDetails = () => {
  const [selectedTab, setSelectedTab] = useState<TabId>('recent_tokens')

  const { Content: TabContent, EmptyContent: TabEmptyContent } =
    tabContents[selectedTab]

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row">
        {(Object.entries(tabContents) as [TabId, TabContent][]).map(
          ([id, { title, icon }]) => (
            <TabButton
              key={id}
              id={id}
              selectedTab={selectedTab}
              onClick={setSelectedTab}
              title={title}
              icon={icon}
            />
          ),
        )}
      </div>

      <div className="w-full border border-accent bg-primary px-4 py-2 text-white md:px-8 md:py-4 2xl:px-16 2xl:py-8">
        {selectedTab === 'recent_tokens' ? <TabContent /> : <TabEmptyContent />}
      </div>
    </div>
  )
}

export default ProfileDetails
