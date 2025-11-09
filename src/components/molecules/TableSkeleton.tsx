import React from 'react'
import { Skeleton } from '@/components/atoms/Skeleton'

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

/**
 * Table skeleton loader for progressive loading state
 */
export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 10,
  columns = 8,
}) => {
  return (
    <div className="w-full space-y-3">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="shimmer" className="h-10 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="shimmer"
              className="h-16 flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

