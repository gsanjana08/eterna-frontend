'use client'

import React, { memo, useState } from 'react'
import { Token, SortConfig } from '@/types/token'
import { TokenRow } from './TokenRow'
import { TableHeader } from './TableHeader'
import { TableSkeleton } from '@/components/molecules/TableSkeleton'
import { cn } from '@/lib/utils'

interface TokenTableProps {
  tokens: Token[]
  isLoading: boolean
  sortConfig: SortConfig
  onSort: (key: SortConfig['key']) => void
  className?: string
}

/**
 * Main token table component with sorting and row rendering
 */
export const TokenTable = memo<TokenTableProps>(
  ({ tokens, isLoading, sortConfig, onSort, className }) => {
    const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null)

    if (isLoading) {
      return <TableSkeleton rows={10} columns={8} />
    }

    if (tokens.length === 0) {
      return (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-gray-700 bg-gray-900/50 p-8">
          <div className="text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-semibold text-white">No tokens found</h3>
            <p className="mt-2 text-sm text-gray-400">
              Try adjusting your filters or search criteria
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className={cn('w-full overflow-x-auto', className)}>
        <table className="w-full border-collapse">
          <TableHeader sortConfig={sortConfig} onSort={onSort} />
          <tbody className="divide-y divide-gray-800">
            {tokens.map((token, index) => (
              <TokenRow
                key={token.id}
                token={token}
                index={index}
                isSelected={selectedTokenId === token.id}
                onSelect={setSelectedTokenId}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)

TokenTable.displayName = 'TokenTable'

