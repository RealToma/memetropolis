'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { RiArrowDownSLine } from '@remixicon/react'
import { ComponentProps, forwardRef } from 'react'
import { cn } from '@/core/lib/utils'

const Root = CollapsiblePrimitive.Root
const Content = CollapsiblePrimitive.Content

const Trigger = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof CollapsiblePrimitive.Trigger>
>(({ children, className, ...props }, ref) => {
  if (!children) {
    return (
      <div className="before:bg-stroke-soft-200 relative flex w-full items-center justify-center before:absolute before:inset-x-0 before:top-1/2 before:h-px before:-translate-y-1/2">
        <CollapsiblePrimitive.Trigger
          className={cn(
            'bg-bg-white-0 focus-visible:ring-offset-bg-white-0 group relative z-10 flex h-8 items-center gap-1 rounded-lg border px-3 text-sm font-medium before:content-[attr(data-open)] focus-visible:ring-2 focus-visible:ring-offset-1 data-[state=open]:before:content-[attr(data-close)]',
            className,
          )}
          data-open="Show more"
          data-close="Show less"
          {...props}
        >
          <RiArrowDownSLine className="size-5 transition-all ease-in-out group-data-[state=open]:rotate-180" />
        </CollapsiblePrimitive.Trigger>
      </div>
    )
  }

  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      {...props}
      className={cn('group', className)}
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  )
})

Trigger.displayName = 'CollapsibleTrigger'

export const Collapsible = {
  Root,
  Content,
  Trigger,
}
