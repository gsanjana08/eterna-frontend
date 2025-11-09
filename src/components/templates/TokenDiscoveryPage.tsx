'use client'

import React, { useMemo } from 'react'
import { useTokens } from '@/hooks/useTokens'
import { TokenTable } from '@/components/organisms/TokenTable'
import { TokenFilters } from '@/components/organisms/TokenFilters'
import { MobileTokenCard } from '@/components/organisms/MobileTokenCard'
import { ErrorBoundary } from '@/components/molecules/ErrorBoundary'
import { TableSkeleton } from '@/components/molecules/TableSkeleton'
import { useBreakpoint } from '@/hooks/useMediaQuery'
import { TokenStatus } from '@/types/token'

/**
 * Main token discovery page template with responsive design
 */
export const TokenDiscoveryPage: React.FC = () => {
  const {
    tokens,
    allTokens,
    isLoading,
    error,
    sortConfig,
    filterConfig,
    handleSort,
    handleFilter,
  } = useTokens()

  const { isMobile } = useBreakpoint()

  // Calculate token counts for each status
  const tokenCounts = useMemo(() => {
    const counts: Record<TokenStatus | 'all', number> = {
      all: allTokens.length,
      new: 0,
      'final-stretch': 0,
      migrated: 0,
    }

    allTokens.forEach(token => {
      counts[token.status]++
    })

    return counts
  }, [allTokens])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error</h2>
          <p className="mt-2 text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Token Discovery
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Real-time token tracking with live price updates
          </p>
        </header>

        {/* Filters */}
        <div className="mb-6">
          <TokenFilters
            filterConfig={filterConfig}
            onFilterChange={handleFilter}
            tokenCounts={tokenCounts}
          />
        </div>

        {/* Content */}
        <ErrorBoundary>
          {isMobile ? (
            // Mobile view - card layout
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-800/50" />
                ))
              ) : tokens.length === 0 ? (
                <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-gray-700 bg-gray-900/50 p-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white">No tokens found</h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                </div>
              ) : (
                tokens.map(token => <MobileTokenCard key={token.id} token={token} />)
              )}
            </div>
          ) : (
            // Desktop view - table layout
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
              <TokenTable
                tokens={tokens}
                isLoading={isLoading}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>
          )}
        </ErrorBoundary>

        {/* Footer */}
        <footer className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
          <p>Showing {tokens.length} of {allTokens.length} tokens</p>
        </footer>
      </div>
    </div>
  )
}

