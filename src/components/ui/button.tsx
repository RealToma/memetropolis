import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/core/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:opacity-80',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  borderColor?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      borderColor,
      variant,
      size,
      loading = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <div className="group relative p-1">
        <Comp
          className={cn(
            buttonVariants({ variant, size, className }),
            loading ? 'opacity-50' : '',
          )}
          ref={ref}
          {...props}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {props.children}
        </Comp>
        <span
          className={`absolute left-0 top-0 h-3 w-3 border ${borderColor} border-b-transparent border-r-transparent opacity-0 transition-opacity group-hover:opacity-100`}
        ></span>
        <span
          className={`absolute right-0 top-0 h-3 w-3 border ${borderColor} border-b-transparent border-l-transparent opacity-0 transition-opacity group-hover:opacity-100`}
        ></span>
        <span
          className={`absolute bottom-0 left-0 h-3 w-3 border ${borderColor} border-r-transparent border-t-transparent opacity-0 transition-opacity group-hover:opacity-100`}
        ></span>
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 border ${borderColor} border-l-transparent border-t-transparent opacity-0 transition-opacity group-hover:opacity-100`}
        ></span>
      </div>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
