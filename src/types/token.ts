/**
 * Token status types representing different stages
 */
export type TokenStatus = 'new' | 'final-stretch' | 'migrated'

/**
 * Price change direction for visual feedback
 */
export type PriceDirection = 'up' | 'down' | 'neutral'

/**
 * Token interface with all required fields
 */
export interface Token {
  id: string
  name: string
  symbol: string
  status: TokenStatus
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  createdAt: number
  lastUpdated: number
  logo?: string
  description?: string
  website?: string
  twitter?: string
  telegram?: string
  priceDirection?: PriceDirection
}

/**
 * Sort configuration for table columns
 */
export interface SortConfig {
  key: keyof Token
  direction: 'asc' | 'desc'
}

/**
 * Filter configuration for token status
 */
export interface FilterConfig {
  status: TokenStatus | 'all'
  search: string
}

/**
 * WebSocket message types for real-time updates
 */
export interface WebSocketMessage {
  type: 'price-update' | 'new-token' | 'status-change'
  data: Partial<Token> & { id: string }
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
}

/**
 * Table column definition
 */
export interface ColumnDef<T> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: T) => React.ReactNode
}

