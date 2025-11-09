import { TokenStatus } from '@/types/token'

/**
 * Application-wide constants
 */

export const APP_NAME = 'Eterna Trade'
export const APP_DESCRIPTION = 'Real-time token discovery and trading platform'

/**
 * WebSocket configuration
 */
export const WS_UPDATE_INTERVAL = 2000 // 2 seconds
export const WS_RECONNECT_DELAY = 3000 // 3 seconds

/**
 * Token status labels and colors
 */
export const TOKEN_STATUS_CONFIG: Record<
  TokenStatus,
  { label: string; color: string; bgColor: string }
> = {
  new: {
    label: 'New Pairs',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  'final-stretch': {
    label: 'Final Stretch',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  migrated: {
    label: 'Migrated',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
}

/**
 * Table pagination defaults
 */
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

/**
 * Performance thresholds
 */
export const INTERACTION_THRESHOLD = 100 // ms
export const LAZY_LOAD_THRESHOLD = 0.5 // 50% of viewport

/**
 * Animation durations
 */
export const TRANSITION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
}

/**
 * Breakpoints matching Tailwind CSS
 */
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Z-index layers
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
}

