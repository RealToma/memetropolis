'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/core/lib/utils'

const Root = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Root.displayName = 'Drawer'

const Trigger = DrawerPrimitive.Trigger

const Portal = DrawerPrimitive.Portal

const Close = DrawerPrimitive.Close

const Overlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/80', className)}
    {...props}
  />
))
Overlay.displayName = DrawerPrimitive.Overlay.displayName

const Content = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'bg-bg-white-0 fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[96%] flex-col rounded-t-[10px] border',
        className,
      )}
      {...props}
    >
      <div className="bg-bg-soft-200 mx-auto mt-4 h-2 w-[100px] rounded-full" />
      {children}
    </DrawerPrimitive.Content>
  </Portal>
))
Content.displayName = 'Drawer Content'

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4', className)} {...props} />
)
Header.displayName = 'Drawer Header'

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
)
Footer.displayName = 'Drawer Footer'

const Title = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))
Title.displayName = DrawerPrimitive.Title.displayName

const Description = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-text-sub-500 text-sm', className)}
    {...props}
  />
))
Description.displayName = DrawerPrimitive.Description.displayName

export const MobileDrawer = {
  Root,
  Portal,
  Overlay,
  Trigger,
  Close,
  Content,
  Header,
  Footer,
  Title,
  Description,
}
