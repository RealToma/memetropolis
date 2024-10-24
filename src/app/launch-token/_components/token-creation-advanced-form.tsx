import Image from 'next/image'
import DatePicker from 'react-datepicker'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  CreateAdvancedTokenSchema,
  createAdvancedTokenSchema,
} from '@/core/schemas/create-advanced-token-schema'

export default function TokenCreationAdvancedForm() {
  const form = useForm<CreateAdvancedTokenSchema>({
    resolver: zodResolver(createAdvancedTokenSchema),
    defaultValues: {
      chain: '',
      jeetTax: '',
      name: '',
      description: '',
      kyc: '',
      xLink: '',
      telegramLink: '',
      totalSupply: '',
      raisedAmount: '',
      salesRatio: '',
      reservedRatio: '',
      liquidityPoolRatio: '',
      launchDate: '',
      launchTime: '',
      allocationPerChain: '',
      chainsSelected: '',
      maximumPerUser: '',
    },
  })

  const onSubmit = (data: CreateAdvancedTokenSchema) => {
    console.log(data)
    // TODO: Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="-mt-10">
          <h1 className="text-2xl font-semibold text-white">Project Info</h1>
          <p className="text-base text-[#B5B3B8]">
            Welcome to the advanced options of project creation
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="chain"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                  Select chain
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="flex h-[44px] w-full items-center gap-2 border border-[#E8DA521A] bg-[#07040B] text-[#FFFAFF]">
                    <SelectTrigger>
                      <SelectValue placeholder="Chain select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#07040B]">
                    <SelectItem value="bnb" className="cursor-pointer">
                      BNB
                    </SelectItem>
                    <SelectItem value="base" className="cursor-pointer">
                      Base
                    </SelectItem>
                    <SelectItem value="solana" className="cursor-pointer">
                      Solana
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jeetTax"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                  Jeet tax
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter value"
                      {...field}
                      className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                    />
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2">
                      <button
                        type="button"
                        className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm border border-[#E8DA521A]"
                        onClick={() => field.onChange(Number(field.value) - 1)}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#E8DA521A]"
                        onClick={() => field.onChange(Number(field.value) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                Token Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Token Name"
                  className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  rows={4}
                  className="w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kyc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                KYC / Non KYC
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your KYC"
                  className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="xLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                  X Link (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Link"
                    className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telegramLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                  Telegram Link (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Link"
                    className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="totalSupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total supply</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="100000"
                    className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="raisedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raised amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="24"
                    className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <FormField
            control={form.control}
            name="salesRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sales ratio</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      placeholder="80"
                      className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                    />
                    <p>%</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reservedRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reserved ratio</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      placeholder="10"
                      className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                    />
                    <p>%</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="liquidityPoolRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liquidity Pool Ratio</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      placeholder="10"
                      className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                    />
                    <p>%</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="launchDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Launch date</FormLabel>
              <FormControl>
                <div className="relative">
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) => {
                      field.onChange(
                        date ? date.toISOString().split('T')[0] : null,
                      )
                    }}
                    customInput={
                      <div className="relative">
                        <Input
                          value={field.value}
                          readOnly
                          className="h-[44px] min-w-full cursor-pointer rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3">
                          <Image
                            src="/assets/img/launch-token/advanced/akar-icons_calendar.svg"
                            alt="Calendar"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                    }
                    className="block w-full border-[#E8DA521A] bg-[#07040B] text-[#FFFAFF]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="launchTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Launch time</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <DatePicker
                    selected={
                      field.value ? new Date(`2000-01-01T${field.value}`) : null
                    }
                    onChange={(date: Date | null) => {
                      field.onChange(
                        date ? date.toTimeString().slice(0, 5) : null,
                      )
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    customInput={
                      <div className="relative w-full">
                        <Input
                          value={field.value}
                          readOnly
                          className="h-[44px] w-full cursor-pointer rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3">
                          <Image
                            src="/assets/img/launch-token/advanced/mdi_clock-outline.svg"
                            alt="Clock"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                    }
                    className="w-full border-[#E8DA521A] bg-[#07040B] text-[#FFFAFF]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allocationPerChain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation per chain</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="10%"
                  className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chainsSelected"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chains selected</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="BNB"
                  className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maximumPerUser"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum per user</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="BNB"
                  className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          borderColor="border-accent"
          className="group relative h-[60px] w-full overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A]"
        >
          Launch meme
        </Button>
      </form>
    </Form>
  )
}
