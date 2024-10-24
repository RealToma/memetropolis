import * as React from 'react'

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}
export const ArrowDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M6.29365 10.7062C6.68428 11.0968 7.31865 11.0968 7.70928 10.7062L12.7093 5.70615C13.0999 5.31553 13.0999 4.68115 12.7093 4.29053C12.3187 3.8999 11.6843 3.8999 11.2937 4.29053L6.9999 8.58428L2.70615 4.29365C2.31553 3.90303 1.68115 3.90303 1.29053 4.29365C0.899902 4.68428 0.899902 5.31865 1.29053 5.70928L6.29053 10.7093L6.29365 10.7062Z"
          fill={color}
        />
      </svg>
    )
  },
)

ArrowDownIcon.displayName = 'ArrowDownIcon'
