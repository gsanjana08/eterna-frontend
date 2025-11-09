'use client'

import React from 'react'
import { TokenStatus, FilterConfig } from '@/types/token'
import { SearchBar } from '@/components/molecules/SearchBar'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'
import { TOKEN_STATUS_CONFIG } from '@/lib/constants'

interface TokenFiltersProps {
  filterConfig: FilterConfig
  onFilterChange: (filter: Partial<FilterConfig>) => void
  tokenCounts: Record<TokenStatus | 'all', number>
}

/**
 * Token filters component with tabs and search
 */
export const TokenFilters: React.FC<TokenFiltersProps> = ({
  filterConfig,
  onFilterChange,
  tokenCounts,
}) => {
  const tabs: Array<{ key: TokenStatus | 'all'; label: string }> = [
    { key: 'all', label: 'All Tokens' },
    { key: 'new', label: TOKEN_STATUS_CONFIG.new.label },
    { key: 'final-stretch', label: TOKEN_STATUS_CONFIG['final-stretch'].label },
    { key: 'migrated', label: TOKEN_STATUS_CONFIG.migrated.label },
  ]

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onFilterChange({ status: tab.key })}
            className={cn(
              'relative px-4 py-2 text-sm font-medium transition-colors',
              'hover:text-white',
              filterConfig.status === tab.key
                ? 'text-white'
                : 'text-gray-400'
            )}
          >
            {tab.label}
            <span
              className={cn(
                'ml-2 rounded-full px-2 py-0.5 text-xs',
                filterConfig.status === tab.key
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-gray-800 text-gray-400'
              )}
            >
              {tokenCounts[tab.key]}
            </span>
            {filterConfig.status === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={filterConfig.search}
            onChange={value => onFilterChange({ search: value })}
            placeholder="Search by name or symbol..."
          />
        </div>
        
        {filterConfig.search && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange({ search: '' })}
          >
            Clear Search
          </Button>
        )}
      </div>
    </div>
  )
}

