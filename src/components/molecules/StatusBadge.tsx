import React from 'react'
import { Badge } from '@/components/atoms/Badge'
import { TokenStatus } from '@/types/token'
import { TOKEN_STATUS_CONFIG } from '@/lib/constants'

interface StatusBadgeProps {
  status: TokenStatus
}

/**
 * Status badge component for token status
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = TOKEN_STATUS_CONFIG[status]
  
  const variantMap: Record<TokenStatus, 'default' | 'success' | 'warning' | 'info'> = {
    new: 'info',
    'final-stretch': 'warning',
    migrated: 'success',
  }

  return (
    <Badge variant={variantMap[status]} size="sm">
      {config.label}
    </Badge>
  )
}

