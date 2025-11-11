import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setTokens,
  updateToken,
  setLoading,
  setSortConfig,
  setFilterConfig,
} from '@/store/slices/tokenSlice'
import { generateMockTokens, getMockWebSocketService } from '@/lib/mock-data'
import { SortConfig, FilterConfig, WebSocketMessage } from '@/types/token'

/**
 * Custom hook for token management with WebSocket updates
 */
export function useTokens() {
  const dispatch = useAppDispatch()
  const { tokens, filteredTokens, isLoading, error, sortConfig, filterConfig } =
    useAppSelector(state => state.tokens)

  /**
   * Initialize tokens and WebSocket connection
   */
  useEffect(() => {
    dispatch(setLoading(true))

    // Generate initial mock data
    const mockTokens = generateMockTokens(60)
    dispatch(setTokens(mockTokens))

    // Setup WebSocket service
    const wsService = getMockWebSocketService(mockTokens)
    
    const unsubscribe = wsService.subscribe((message: WebSocketMessage) => {
      if (message.type === 'price-update') {
        dispatch(updateToken(message.data))
      }
    })

    wsService.connect()

    return () => {
      unsubscribe()
      wsService.disconnect()
    }
  }, [dispatch])

  /**
   * Update sort configuration
   */
  const handleSort = useCallback(
    (key: SortConfig['key']) => {
      const newDirection =
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
      dispatch(setSortConfig({ key, direction: newDirection }))
    },
    [dispatch, sortConfig]
  )

  /**
   * Update filter configuration
   */
  const handleFilter = useCallback(
    (filter: Partial<FilterConfig>) => {
      dispatch(setFilterConfig(filter))
    },
    [dispatch]
  )

  return {
    tokens: filteredTokens,
    allTokens: tokens,
    isLoading,
    error,
    sortConfig,
    filterConfig,
    handleSort,
    handleFilter,
  }
}

