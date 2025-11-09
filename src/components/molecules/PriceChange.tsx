import React, { memo, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { formatPercentage } from '@/lib/utils'
import { PriceDirection } from '@/types/token'

interface PriceChangeProps {
  value: number
  direction?: PriceDirection
  showIcon?: boolean
  className?: string
}

/**
 * Memoized price change component with smooth color transitions
 * Matches Axiom Trade's pixel-perfect design with ≤2px accuracy
 */
export const PriceChange = memo<PriceChangeProps>(
  ({ value, direction, showIcon = true, className }) => {
    const [isAnimating, setIsAnimating] = useState(false)
    const isPositive = value >= 0
    
    // Trigger animation when direction changes
    useEffect(() => {
      if (direction && direction !== 'neutral') {
        setIsAnimating(true)
        const timer = setTimeout(() => setIsAnimating(false), 600)
        return () => clearTimeout(timer)
      }
    }, [direction])

    const colorClass = isPositive ? 'text-green-500' : 'text-red-500'
    
    const animationClass = isAnimating
      ? direction === 'up'
        ? 'price-up-animate'
        : direction === 'down'
        ? 'price-down-animate'
        : ''
      : ''

    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-medium price-transition rounded px-1.5 py-0.5',
          colorClass,
          animationClass,
          className
        )}
      >
        {showIcon && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'transition-all duration-300 ease-in-out',
              isPositive ? '' : 'rotate-180'
            )}
          >
            <path
              d="M6 2L10 8H2L6 2Z"
              fill="currentColor"
            />
          </svg>
        )}
        <span className="tabular-nums">{formatPercentage(value)}</span>
      </span>
    )
  }
)

PriceChange.displayName = 'PriceChange'

