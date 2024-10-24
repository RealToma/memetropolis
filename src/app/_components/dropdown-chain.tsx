import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DropdownChain = () => {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="flex w-full items-center border border-accent md:w-[290px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border border-accent bg-primary">
        <SelectGroup>
          <SelectItem value="all" className="cursor-pointer hover:bg-secondary">
            <p className="flex gap-2">
              <img src="/assets/img/home/projects/chain-all.svg" />
              All chains
            </p>
          </SelectItem>
          <hr className="border-secondary" />
          <SelectItem
            value="solana"
            className="cursor-pointer hover:bg-secondary"
          >
            <p className="flex gap-2">
              <img src="/assets/img/home/projects/chain-sol.svg" />
              Solana
            </p>
          </SelectItem>
          <hr className="border-secondary" />
          <SelectItem value="eth" className="cursor-pointer hover:bg-secondary">
            <p className="flex gap-2">
              <img src="/assets/img/home/projects/chain-eth.svg" />
              ETH
            </p>
          </SelectItem>
          <hr className="border-secondary" />
          <SelectItem
            value="avax"
            className="cursor-pointer hover:bg-secondary"
          >
            <p className="flex gap-2">
              <img src="/assets/img/home/projects/chain-avax.svg" />
              Avax
            </p>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DropdownChain
