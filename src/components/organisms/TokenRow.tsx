'use client'

import React, { memo, useState } from 'react'
import { Token } from '@/types/token'
import { TokenLogo } from '@/components/molecules/TokenLogo'
import { StatusBadge } from '@/components/molecules/StatusBadge'
import { PriceChange } from '@/components/molecules/PriceChange'
import { Popover } from '@/components/atoms/Popover'
import { Tooltip } from '@/components/atoms/Tooltip'
import { Modal } from '@/components/atoms/Modal'
import { cn, formatCurrency, formatCompactCurrency, formatNumber, formatTimeAgo } from '@/lib/utils'

interface TokenRowProps {
  token: Token
  index: number
  isSelected: boolean
  onSelect: (id: string | null) => void
}

/**
 * Memoized token row component with all interactions
 */
export const TokenRow = memo<TokenRowProps>(
  ({ token, index, isSelected, onSelect }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const handleRowClick = () => {
      onSelect(isSelected ? null : token.id)
    }

    const handleDetailsClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsModalOpen(true)
    }

    const handlePopoverToggle = (open: boolean) => {
      setIsPopoverOpen(open)
    }

    return (
      <>
        <tr
          onClick={handleRowClick}
          className={cn(
            'group cursor-pointer transition-all duration-150',
            'hover:bg-gray-800/50',
            isSelected && 'bg-gray-800/70',
            index % 2 === 0 ? 'bg-gray-900/20' : 'bg-gray-900/40'
          )}
        >
          {/* Token Name & Logo */}
          <td className="px-4 py-4">
            <div className="flex items-center gap-3">
              <TokenLogo src={token.logo} alt={token.symbol} size="md" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">{token.name}</span>
                <span className="text-xs text-gray-400">{token.symbol}</span>
              </div>
            </div>
          </td>

          {/* Status */}
          <td className="px-4 py-4">
            <StatusBadge status={token.status} />
          </td>

          {/* Price with Popover */}
          <td className="px-4 py-4 text-right">
            <Popover
              content={
                <div className="space-y-2">
                  <h3 className="font-semibold text-white">Price Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current:</span>
                      <span className="text-white">{formatCurrency(token.price, 6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Change:</span>
                      <PriceChange value={token.priceChange24h} showIcon={false} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated:</span>
                      <span className="text-white">{formatTimeAgo(token.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
              }
              open={isPopoverOpen}
              onOpenChange={handlePopoverToggle}
              side="top"
            >
              <button className="font-mono text-white hover:text-blue-400 transition-all duration-300 ease-in-out price-transition">
                <span className="tabular-nums">
                  {formatCurrency(token.price, token.price < 0.01 ? 6 : 2)}
                </span>
              </button>
            </Popover>
          </td>

          {/* 24h Change */}
          <td className="px-4 py-4 text-right">
            <div className="transition-all duration-300 ease-in-out">
              <PriceChange
                value={token.priceChange24h}
                direction={token.priceDirection}
              />
            </div>
          </td>

          {/* 24h Volume with Tooltip */}
          <td className="px-4 py-4 text-right">
            <Tooltip content={formatCurrency(token.volume24h)} side="top">
              <span className="cursor-help text-white">
                {formatCompactCurrency(token.volume24h)}
              </span>
            </Tooltip>
          </td>

          {/* Market Cap with Tooltip */}
          <td className="px-4 py-4 text-right">
            <Tooltip content={formatCurrency(token.marketCap)} side="top">
              <span className="cursor-help text-white">
                {formatCompactCurrency(token.marketCap)}
              </span>
            </Tooltip>
          </td>

          {/* Liquidity with Tooltip */}
          <td className="px-4 py-4 text-right">
            <Tooltip content={formatCurrency(token.liquidity)} side="top">
              <span className="cursor-help text-white">
                {formatCompactCurrency(token.liquidity)}
              </span>
            </Tooltip>
          </td>

          {/* Holders with Modal trigger */}
          <td className="px-4 py-4 text-right">
            <button
              onClick={handleDetailsClick}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {formatNumber(token.holders, 0)}
            </button>
          </td>
        </tr>

        {/* Token Details Modal */}
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={`${token.name} (${token.symbol})`}
          description="Detailed token information"
          className="max-w-2xl"
        >
          <div className="space-y-6">
            {/* Token Header */}
            <div className="flex items-center gap-4">
              <TokenLogo src={token.logo} alt={token.symbol} size="lg" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{token.name}</h3>
                <p className="text-gray-400">{token.symbol}</p>
              </div>
              <StatusBadge status={token.status} />
            </div>

            {/* Price Info */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
              <div>
                <p className="text-sm text-gray-400">Current Price</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(token.price, token.price < 0.01 ? 6 : 2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">24h Change</p>
                <div className="text-2xl font-bold">
                  <PriceChange value={token.priceChange24h} />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <p className="text-sm text-gray-400">24h Volume</p>
                <p className="text-lg font-semibold text-white">
                  {formatCurrency(token.volume24h)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <p className="text-sm text-gray-400">Market Cap</p>
                <p className="text-lg font-semibold text-white">
                  {formatCurrency(token.marketCap)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <p className="text-sm text-gray-400">Liquidity</p>
                <p className="text-lg font-semibold text-white">
                  {formatCurrency(token.liquidity)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <p className="text-sm text-gray-400">Holders</p>
                <p className="text-lg font-semibold text-white">
                  {formatNumber(token.holders, 0)}
                </p>
              </div>
            </div>

            {/* Description */}
            {token.description && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-white">About</h4>
                <p className="text-sm text-gray-400">{token.description}</p>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3">
              {token.website && (
                <a
                  href={token.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                  </svg>
                  Website
                </a>
              )}
              {token.twitter && (
                <a
                  href={token.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                  Twitter
                </a>
              )}
              {token.telegram && (
                <a
                  href={token.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.84 8.673c-.139.622-.499.776-.99.483l-2.734-2.014-1.319 1.27c-.145.145-.268.268-.552.268l.197-2.799 5.091-4.601c.221-.197-.048-.306-.343-.11l-6.292 3.963-2.71-.847c-.591-.183-.602-.591.123-.877l10.594-4.083c.494-.183.924.11.764.877z" />
                  </svg>
                  Telegram
                </a>
              )}
            </div>

            {/* Metadata */}
            <div className="border-t border-gray-700 pt-4 text-xs text-gray-400">
              <p>Created: {formatTimeAgo(token.createdAt)}</p>
              <p>Last Updated: {formatTimeAgo(token.lastUpdated)}</p>
            </div>
          </div>
        </Modal>
      </>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison for performance optimization
    return (
      prevProps.token.id === nextProps.token.id &&
      prevProps.token.price === nextProps.token.price &&
      prevProps.token.priceChange24h === nextProps.token.priceChange24h &&
      prevProps.token.priceDirection === nextProps.token.priceDirection &&
      prevProps.isSelected === nextProps.isSelected
    )
  }
)

TokenRow.displayName = 'TokenRow'

