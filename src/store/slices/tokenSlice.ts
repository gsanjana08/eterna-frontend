import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token, SortConfig, FilterConfig, TokenStatus } from '@/types/token'

interface TokenState {
  tokens: Token[]
  filteredTokens: Token[]
  isLoading: boolean
  error: string | null
  sortConfig: SortConfig
  filterConfig: FilterConfig
  selectedToken: Token | null
}

const initialState: TokenState = {
  tokens: [],
  filteredTokens: [],
  isLoading: false,
  error: null,
  sortConfig: {
    key: 'createdAt',
    direction: 'desc',
  },
  filterConfig: {
    status: 'all',
    search: '',
  },
  selectedToken: null,
}

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload
      state.filteredTokens = filterAndSortTokens(
        action.payload,
        state.filterConfig,
        state.sortConfig
      )
      state.isLoading = false
    },
    
    updateToken: (state, action: PayloadAction<Partial<Token> & { id: string }>) => {
      const index = state.tokens.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.tokens[index] = {
          ...state.tokens[index],
          ...action.payload,
        }
      }
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        state.filterConfig,
        state.sortConfig
      )
    },
    
    addToken: (state, action: PayloadAction<Token>) => {
      state.tokens.unshift(action.payload)
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        state.filterConfig,
        state.sortConfig
      )
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        state.filterConfig,
        state.sortConfig
      )
    },
    
    setFilterConfig: (state, action: PayloadAction<Partial<FilterConfig>>) => {
      state.filterConfig = {
        ...state.filterConfig,
        ...action.payload,
      }
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        state.filterConfig,
        state.sortConfig
      )
    },
    
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload
    },
    
    clearFilters: (state) => {
      state.filterConfig = initialState.filterConfig
      state.filteredTokens = filterAndSortTokens(
        state.tokens,
        state.filterConfig,
        state.sortConfig
      )
    },
  },
})

/**
 * Helper function to filter and sort tokens
 */
function filterAndSortTokens(
  tokens: Token[],
  filterConfig: FilterConfig,
  sortConfig: SortConfig
): Token[] {
  let filtered = [...tokens]

  // Apply status filter
  if (filterConfig.status !== 'all') {
    filtered = filtered.filter(token => token.status === filterConfig.status)
  }

  // Apply search filter
  if (filterConfig.search) {
    const search = filterConfig.search.toLowerCase()
    filtered = filtered.filter(
      token =>
        token.name.toLowerCase().includes(search) ||
        token.symbol.toLowerCase().includes(search)
    )
  }

  // Apply sorting
  filtered.sort((a, b) => {
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue === bValue) return 0

    const comparison = aValue > bValue ? 1 : -1
    return sortConfig.direction === 'asc' ? comparison : -comparison
  })

  return filtered
}

export const {
  setTokens,
  updateToken,
  addToken,
  setLoading,
  setError,
  setSortConfig,
  setFilterConfig,
  setSelectedToken,
  clearFilters,
} = tokenSlice.actions

export default tokenSlice.reducer

