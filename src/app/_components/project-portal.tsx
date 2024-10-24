import Link from "next/link";

const ProjectPortal = ({
  projectUrl,
  tokenSymbol,
  tokenAddress,
  chainId,
}: {
  projectUrl: string
  tokenSymbol: string
  tokenAddress: string
  chainId: number
}) => {
  return (
    <Link
      href={`/token/${tokenAddress}?chain=${chainId}&symbol=${tokenSymbol}`}
      className="flex cursor-pointer flex-col items-center justify-center"
    >
      <img
        src={`/assets/img/home/projects/${projectUrl}`}
        className="h-[27px] w-[27px] md:h-[80px] md:w-[80px]"
      />
      <img
        src="/assets/img/home/projects/projects-disc.svg"
        className="h-[30px] w-[32px] md:h-[91px] md:w-[128px]"
      />
    </Link>
  )
}

export default ProjectPortal
