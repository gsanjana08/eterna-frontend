import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface TokenLogoProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Token logo component with fallback
 */
export const TokenLogo: React.FC<TokenLogoProps> = ({
  src,
  alt,
  size = 'md',
  className,
}) => {
  const [hasError, setHasError] = useState(false)

  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }

  if (!src || hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white',
          sizes[size],
          className
        )}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size === 'sm' ? 24 : size === 'md' ? 32 : 40}
      height={size === 'sm' ? 24 : size === 'md' ? 32 : 40}
      className={cn('rounded-full object-cover', sizes[size], className)}
      onError={() => setHasError(true)}
      unoptimized
    />
  )
}

