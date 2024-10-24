import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DropdownCategory = () => {
  return (
    <Select defaultValue="projects">
      <SelectTrigger className="flex w-full items-center border border-accent md:w-[290px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border border-accent bg-primary">
        <SelectGroup>
          <SelectItem
            value="projects"
            className="cursor-pointer hover:bg-secondary"
          >
            <p className="flex gap-2">
              <img src="/assets/img/home/projects/category-projects.svg" />
              Projects
            </p>
          </SelectItem>
          <hr className="border-secondary" />
          <SelectItem
            value="traders"
            className="cursor-pointer hover:bg-secondary"
          >
            <p className="flex gap-2">
              <img src="/assets/img/home/projects/category-traders.svg" />
              Traders
            </p>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DropdownCategory
