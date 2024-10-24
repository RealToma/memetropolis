import { ComponentProps, createContext, ReactNode, useContext } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { QUERIES, useMediaQuery } from '@/core/hooks/use-media-query'

import { MobileDrawer } from './mobile-drawer'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/core/lib/utils'

type ResponsiveDialogContextData = { isDesktop: boolean }

const ResponsiveDialogContext = createContext<ResponsiveDialogContextData>(
  {} as ResponsiveDialogContextData,
)

function useResponsiveDialog() {
  const context = useContext(ResponsiveDialogContext)

  if (!context) {
    throw new Error(
      'useResponsiveDialog must be used within a ResponsiveDialogProvider',
    )
  }

  return context
}

type RootProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  desktopProps?: Omit<
    ComponentProps<typeof Dialog>,
    'open' | 'onOpenChange' | 'children'
  >
  mobileProps?: Omit<
    ComponentProps<typeof DrawerPrimitive.Root>,
    'open' | 'onOpenChange' | 'children' | 'fadeFromIndex'
  >
}

function Root({ desktopProps, mobileProps, ...rest }: RootProps) {
  const isDesktop = useMediaQuery(QUERIES.DESKTOP)

  return (
    <ResponsiveDialogContext.Provider value={{ isDesktop }}>
      {isDesktop ? (
        <Dialog {...rest} {...desktopProps} />
      ) : (
        <MobileDrawer.Root {...rest} {...mobileProps} />
      )}
    </ResponsiveDialogContext.Provider>
  )
}

type ContentProps = {
  children: ReactNode
  className?: string
}

function Content(props: ContentProps) {
  const { isDesktop } = useResponsiveDialog()

  return isDesktop ? (
    <DialogContent {...props} className={cn('p-0', props.className)} />
  ) : (
    <MobileDrawer.Content {...props} />
  )
}

function Header(props: ComponentProps<typeof DialogHeader>) {
  const { isDesktop } = useResponsiveDialog()

  return isDesktop ? (
    <DialogHeader
      {...props}
      className={cn('space-y-0 border-b px-5 py-4', props.className)}
    />
  ) : (
    <MobileDrawer.Header {...props} />
  )
}

function Title(props: ComponentProps<typeof DialogTitle>) {
  const { isDesktop } = useResponsiveDialog()

  return isDesktop ? (
    <DialogTitle {...props} />
  ) : (
    <MobileDrawer.Title {...props} />
  )
}

function Footer(props: ComponentProps<typeof DialogFooter>) {
  const { isDesktop } = useResponsiveDialog()

  return isDesktop ? (
    <DialogFooter {...props} />
  ) : (
    <MobileDrawer.Footer {...props} />
  )
}

function Close(props: ComponentProps<typeof DialogClose>) {
  const { isDesktop } = useResponsiveDialog()

  return isDesktop ? (
    <DialogClose {...props} />
  ) : (
    <MobileDrawer.Close {...props} />
  )
}

export const ResponsiveDialog = {
  Root,
  Content,
  Header,
  Title,
  Footer,
  Close,
}
