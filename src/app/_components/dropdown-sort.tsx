import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DropdownSort = () => {
  return (
    <Select defaultValue="hottest">
      <SelectTrigger className="flex w-full items-center border border-accent md:w-[290px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border border-accent bg-primary">
        <SelectGroup>
          <SelectItem
            value="hottest"
            className="cursor-pointer hover:bg-secondary"
          >
            Sort: Hottest
          </SelectItem>
          <hr className="border-secondary" />
          <SelectItem
            value="newest"
            className="cursor-pointer hover:bg-secondary"
          >
            Sort: Newest
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DropdownSort
