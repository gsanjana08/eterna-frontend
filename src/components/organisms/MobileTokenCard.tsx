'use client'

import React, { memo, useState } from 'react'
import { Token } from '@/types/token'
import { TokenLogo } from '@/components/molecules/TokenLogo'
import { StatusBadge } from '@/components/molecules/StatusBadge'
import { PriceChange } from '@/components/molecules/PriceChange'
import { Modal } from '@/components/atoms/Modal'
import { cn, formatCurrency, formatCompactCurrency, formatNumber, formatTimeAgo } from '@/lib/utils'

interface MobileTokenCardProps {
  token: Token
}

/**
 * Mobile-optimized token card component
 */
export const MobileTokenCard = memo<MobileTokenCardProps>(({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={cn(
          'rounded-lg border border-gray-700 bg-gray-900/50 p-4',
          'cursor-pointer transition-all hover:bg-gray-800/50',
          'active:scale-[0.98]'
        )}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TokenLogo src={token.logo} alt={token.symbol} size="md" />
            <div>
              <h3 className="font-semibold text-white">{token.name}</h3>
              <p className="text-xs text-gray-400">{token.symbol}</p>
            </div>
          </div>
          <StatusBadge status={token.status} />
        </div>

        {/* Price */}
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-xl font-bold text-white">
              {formatCurrency(token.price, token.price < 0.01 ? 6 : 2)}
            </p>
          </div>
          <PriceChange value={token.priceChange24h} direction={token.priceDirection} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 border-t border-gray-700 pt-3">
          <div>
            <p className="text-xs text-gray-400">Volume 24h</p>
            <p className="text-sm font-medium text-white">
              {formatCompactCurrency(token.volume24h)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Market Cap</p>
            <p className="text-sm font-medium text-white">
              {formatCompactCurrency(token.marketCap)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Liquidity</p>
            <p className="text-sm font-medium text-white">
              {formatCompactCurrency(token.liquidity)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Holders</p>
            <p className="text-sm font-medium text-white">
              {formatNumber(token.holders, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Token Details Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={`${token.name} (${token.symbol})`}
        description="Detailed token information"
      >
        <div className="space-y-4">
          {/* Token Header */}
          <div className="flex items-center gap-3">
            <TokenLogo src={token.logo} alt={token.symbol} size="lg" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{token.name}</h3>
              <p className="text-gray-400">{token.symbol}</p>
            </div>
            <StatusBadge status={token.status} />
          </div>

          {/* Price Info */}
          <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
            <div className="mb-2">
              <p className="text-sm text-gray-400">Current Price</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(token.price, token.price < 0.01 ? 6 : 2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">24h Change</p>
              <div className="text-xl font-bold">
                <PriceChange value={token.priceChange24h} />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-2">
            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
              <p className="text-xs text-gray-400">24h Volume</p>
              <p className="text-base font-semibold text-white">
                {formatCurrency(token.volume24h)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
              <p className="text-xs text-gray-400">Market Cap</p>
              <p className="text-base font-semibold text-white">
                {formatCurrency(token.marketCap)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
              <p className="text-xs text-gray-400">Liquidity</p>
              <p className="text-base font-semibold text-white">
                {formatCurrency(token.liquidity)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
              <p className="text-xs text-gray-400">Holders</p>
              <p className="text-base font-semibold text-white">
                {formatNumber(token.holders, 0)}
              </p>
            </div>
          </div>

          {/* Description */}
          {token.description && (
            <div>
              <h4 className="mb-1 text-sm font-semibold text-white">About</h4>
              <p className="text-sm text-gray-400">{token.description}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {token.website && (
              <a
                href={token.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-xs text-white transition-colors hover:bg-gray-800"
              >
                Website
              </a>
            )}
            {token.twitter && (
              <a
                href={token.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-xs text-white transition-colors hover:bg-gray-800"
              >
                Twitter
              </a>
            )}
            {token.telegram && (
              <a
                href={token.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-xs text-white transition-colors hover:bg-gray-800"
              >
                Telegram
              </a>
            )}
          </div>

          {/* Metadata */}
          <div className="border-t border-gray-700 pt-3 text-xs text-gray-400">
            <p>Created: {formatTimeAgo(token.createdAt)}</p>
            <p>Last Updated: {formatTimeAgo(token.lastUpdated)}</p>
          </div>
        </div>
      </Modal>
    </>
  )
})

MobileTokenCard.displayName = 'MobileTokenCard'

