import React, { memo } from 'react'
import { SortConfig } from '@/types/token'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/atoms/Tooltip'

interface TableHeaderProps {
  sortConfig: SortConfig
  onSort: (key: SortConfig['key']) => void
}

interface HeaderColumn {
  key: SortConfig['key']
  label: string
  sortable: boolean
  align?: 'left' | 'center' | 'right'
  tooltip?: string
  className?: string
}

const COLUMNS: HeaderColumn[] = [
  { key: 'name', label: 'Token', sortable: true, align: 'left' },
  { key: 'status', label: 'Status', sortable: true, align: 'left' },
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    align: 'right',
    tooltip: 'Current token price',
  },
  {
    key: 'priceChange24h',
    label: '24h Change',
    sortable: true,
    align: 'right',
    tooltip: 'Price change in the last 24 hours',
  },
  {
    key: 'volume24h',
    label: '24h Volume',
    sortable: true,
    align: 'right',
    tooltip: 'Trading volume in the last 24 hours',
  },
  {
    key: 'marketCap',
    label: 'Market Cap',
    sortable: true,
    align: 'right',
    tooltip: 'Total market capitalization',
  },
  {
    key: 'liquidity',
    label: 'Liquidity',
    sortable: true,
    align: 'right',
    tooltip: 'Available liquidity',
  },
  {
    key: 'holders',
    label: 'Holders',
    sortable: true,
    align: 'right',
    tooltip: 'Number of token holders',
  },
]

/**
 * Table header component with sortable columns
 */
export const TableHeader = memo<TableHeaderProps>(({ sortConfig, onSort }) => {
  const renderHeaderCell = (column: HeaderColumn) => {
    const isSorted = sortConfig.key === column.key
    const content = (
      <button
        onClick={() => column.sortable && onSort(column.key)}
        className={cn(
          'group flex w-full items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors',
          column.align === 'right' && 'justify-end',
          column.align === 'center' && 'justify-center',
          column.sortable
            ? 'cursor-pointer hover:text-white'
            : 'cursor-default',
          isSorted ? 'text-white' : 'text-gray-400'
        )}
        disabled={!column.sortable}
      >
        <span>{column.label}</span>
        {column.sortable && (
          <svg
            className={cn(
              'h-4 w-4 transition-all',
              isSorted ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
              isSorted && sortConfig.direction === 'desc' && 'rotate-180'
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        )}
      </button>
    )

    if (column.tooltip) {
      return (
        <Tooltip content={column.tooltip} side="top">
          {content}
        </Tooltip>
      )
    }

    return content
  }

  return (
    <thead className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm">
      <tr className="border-b border-gray-800">
        {COLUMNS.map(column => (
          <th
            key={column.key}
            className={cn(
              'text-left',
              column.align === 'right' && 'text-right',
              column.align === 'center' && 'text-center'
            )}
          >
            {renderHeaderCell(column)}
          </th>
        ))}
      </tr>
    </thead>
  )
})

TableHeader.displayName = 'TableHeader'

