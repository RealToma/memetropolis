import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SUPPORT_CHAINS } from "@/core/constants/chains";
import { getChainLogo, getChainShortName } from "@/core/utils";

interface TokenItemProps {
  value: string
  src: string
  alt: string
  label: string
}

const TokenItem: React.FC<TokenItemProps> = ({ value, src, alt, label }) => (
  <SelectItem value={value} className="cursor-pointer hover:bg-secondary">
    <p className="flex gap-1">
      <Image src={src} alt={alt} width={20} height={20} />
      {label}
    </p>
  </SelectItem>
)

const DropdownToken = ({
  nativeToken,
  setNativeToken,
}: {
  nativeToken: string
  setNativeToken: (nativeToken: string) => void
}) => {
  return (
    <Select
      defaultValue={nativeToken}
      onValueChange={(value) => {
        setNativeToken(value)
      }}
      disabled={true}
    >
      <SelectTrigger className="flex w-full items-center p-0 pl-5 md:w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-primary">
        <SelectGroup>
          {
            SUPPORT_CHAINS.map((chain) => {
              return (
                <TokenItem
                  key={chain.id}
                  value={chain.id.toString()}
                  src={getChainLogo(chain.id)}
                  alt="Chain Logo"
                  label={getChainShortName(chain.id)}
                />
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DropdownToken
