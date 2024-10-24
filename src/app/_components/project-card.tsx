import { useState } from 'react'
import Link from 'next/link'
import { convertToCurrency } from '@/core/utils/format-number'
import { getTimeAgo } from '@/core/utils/format-date'
import { Token } from '@/core/types/token'
import { getChainLogo } from '@/core/utils'

interface ProjectCardProps {
  hoverUrl: string
  token: Token
}

const ProjectCard = ({ hoverUrl, token }: ProjectCardProps) => {
  console.log('token: ', token)

  const [imageError, setImageError] = useState(false)
  const handleImageError = () => {
    setImageError(true)
  }

  const [ownerImageError, setOwnerImageError] = useState(false)
  const handleOwnerImageError = () => {
    setOwnerImageError(true)
  }

  return (
    <div className="group relative cursor-pointer">
      <div
        className={`invisible absolute left-[-40px] top-[-40px] h-[calc(100%+80px)] w-[calc(100%+80px)] bg-cover bg-center bg-no-repeat group-hover:visible`}
        style={{
          backgroundImage: `url('${hoverUrl}')`,
        }}
      />
      <div className="relative min-w-[300px] bg-[url('/assets/img/home/spotlights/spotlights-background.svg')] p-4 pl-8">
        <img
          src={getChainLogo(token.chainId)}
          className="absolute right-[10px] top-[-10px] h-7 w-7"
          alt={`Chain: ${token.chainId}`}
        />
        <div className="flex items-center gap-2">
          {token.image && !imageError ? (
            <img
              src={token.image}
              className="h-[60px] w-[60px] rounded-full"
              alt=""
              onError={handleImageError}
            />
          ) : (
            <img src="/assets/img/home/spotlights/spotlights-img.svg" />
          )}
          <div className="flex flex-col gap-[6px]">
            <p className="text-sm font-semibold text-[#8A8A8A]">
              {getTimeAgo(token.creationTimestamp)}
            </p>
            <p>{token.name}</p>
            <p className="text-sm font-semibold text-white">
              Mcap: {convertToCurrency(Number(token.totalSupply))}
            </p>
          </div>
        </div>
        <hr className="my-[10px] border-[#FFFFFF33]" />
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Link href="/">
              <img
                src="/assets/img/home/spotlights/spotlights-x.svg"
                className="h-4 w-4"
              />
            </Link>
            <Link href="/">
              <img
                src="/assets/img/home/spotlights/spotlights-www.svg"
                className="h-4 w-4"
              />
            </Link>
            <Link href="/">
              <img
                src="/assets/img/home/spotlights/spotlights-linkedin.svg"
                className="h-4 w-4"
              />
            </Link>
          </div>
          <p className="flex gap-2 text-sm text-[#DEDEDE]">
            {token.ownerImage && !ownerImageError ? (
              <img
                src={token.ownerImage}
                className="h-[20px] w-[20px] rounded-full"
                alt=""
                onError={handleOwnerImageError}
              />
            ) : (
              <img src="/assets/img/home/spotlights/spotlights-created-by.svg" />
            )}
            {token.ownerName}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
