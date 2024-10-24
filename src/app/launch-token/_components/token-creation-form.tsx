import { useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCreateToken } from '@/core/services/_contract/evm/use-create-token'
import {
  createTokenSchema,
  CreateTokenSchema,
} from '@/core/schemas/create-token-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { isAddress as isEvmAddress } from 'viem'

import { useCreateToken as useSolanaCreateToken } from '@/core/services/_contract/solana/use-create-token'
import { useWallet } from '@/core/hooks/use-wallet'
import { useUploadPinata } from '@/core/services/images/use-upload-pinata'
import TokenCreationAdvancedForm from './token-creation-advanced-form'
import { DialogClose } from '@radix-ui/react-dialog'
import { SUPPORT_CHAINS } from '@/core/constants/chains'

export default function TokenCreationForm() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { mutate, isPending } = useCreateToken()
  const { mutate: solanaMutate, isPending: isSolanaPending } =
    useSolanaCreateToken()
  const { wallets, isConnected, chainId } = useWallet()
  const form = useForm<CreateTokenSchema>({
    resolver: zodResolver(createTokenSchema),
    defaultValues: {
      image: '',
      chain: '',
      jeetTax: 0,
      name: '',
      symbol: '',
      description: '',
      kyc: '',
      xLink: '',
      telegramLink: '',
    },
  })

  const imageUrl = useWatch({ control: form.control, name: 'image' })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string
        form.setValue('image', imageDataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const { mutateAsync: uploadToPinataAsync, isPending: isUploading } =
    useUploadPinata()

  const onSubmit = async (data: CreateTokenSchema) => {
    let imageUrl
    if (selectedFile) {
      try {
        // Upload image to IPFS using Pinata
        imageUrl = await uploadToPinataAsync(selectedFile)
      } catch (error) {
        console.error('Error uploading to IPFS:', error)
        toast.error('Failed to upload image to IPFS')
      }
    }

    // Update the form data with the IPFS URL
    const updatedData = { ...data, image: imageUrl }

    // Submit the form with updated data
    if (isConnected) {
      if (isEvmAddress(wallets[0].address)) {
        mutate(
          { data: updatedData },
          {
            onSuccess: () => {
              toast.success('New Meme Token Created!')
            },
            onError: (e: any) => {
              toast.error(e.shortMessage)
            },
          },
        )
      } else {
        solanaMutate(
          { data: updatedData },
          {
            onSuccess: () => {
              toast.success('New Meme Token Created!')
            },
            onError: (e: any) => {
              toast.error(e.shortMessage)
            },
          },
        )
      }
    }
  }

  return (
    <>
      <h1 className="relative text-center font-hanson text-3xl font-bold uppercase text-[#FFFAFF] md:text-6xl">
        Start with the info
        <img
          src="/assets/img/launch-token/start-with-the-info/title-ribbon.svg"
          className="absolute left-[-70px] top-[-60px]"
        />
        <img
          src="/assets/img/launch-token/start-with-the-info/title-ribbon.svg"
          className="absolute right-[-70px] top-[-60px] -scale-x-100"
        />
      </h1>

      <div className="flex w-full flex-col gap-6 md:flex-row">
        <div
          className="relative min-h-[300px] w-full cursor-pointer bg-black md:w-1/2"
          onClick={() => fileInputRef.current?.click()}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded token image"
              className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          ) : (
            <img
              src="/assets/img/launch-token/icon-file-upload.svg"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="w-full text-lg font-semibold text-[#FFFAFF] md:w-1/2">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                          {SUPPORT_CHAINS.map((chain) => {
                            return (
                              <SelectItem
                                key={chain.id.toString()}
                                value={chain.id.toString()}
                                className="cursor-pointer"
                              >
                                {chain.name}
                              </SelectItem>
                            )
                          })}
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="h-[44px] rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 pr-16 text-[#FFFAFF]"
                          />
                          <div className="absolute right-3 top-1/2 flex -translate-y-1/2">
                            <button
                              type="button"
                              className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm border border-[#E8DA521A]"
                              onClick={() => field.onChange(field.value - 1)}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#E8DA521A]"
                              onClick={() => field.onChange(field.value + 1)}
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

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2 block text-sm font-medium text-[#FFFAFF]">
                        Token Symbol
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Token Symbol"
                          className="h-[44px] w-full rounded-none border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        className="w-full border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                        placeholder="Your KYC"
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
                          className="w-full border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                          placeholder="Link"
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
                          className="w-full border border-[#E8DA521A] bg-[#07040B] p-3 text-[#FFFAFF] outline-none"
                          placeholder="Link"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full justify-between gap-6">
                <Button
                  borderColor="border-accent"
                  className={
                    'group relative h-[60px] w-full min-w-[290px] overflow-hidden rounded-none border border-accent font-medium text-accent'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setIsModalOpen(true)
                  }}
                >
                  + Advanced options
                </Button>

                <Button
                  type="submit"
                  disabled={isUploading || isPending || isSolanaPending}
                  loading={isUploading || isPending || isSolanaPending}
                  borderColor="border-accent"
                  className={
                    'group relative h-[60px] w-full min-w-[290px] overflow-hidden rounded-none border border-accent bg-accent font-medium text-[#110A1A]'
                  }
                >
                  <span className="relative z-10">
                    {isUploading ? 'Uploading to IPFS...' : 'Launch Token'}
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex h-[80vh] w-full max-w-screen-lg flex-col items-center justify-start overflow-y-auto border-none p-8 sm:max-h-[80vh]">
          <DialogClose asChild>
            <button className="absolute right-2 top-2 z-[10] rounded-full bg-[#322C3A]">
              <img src="/assets/img/launch-token/advanced/icon-close.svg" />
            </button>
          </DialogClose>
          <DialogTitle className="mb-4" />
          <div className="w-full">
            <TokenCreationAdvancedForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
