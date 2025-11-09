import { Token, TokenStatus, WebSocketMessage } from '@/types/token'
import { randomBetween, generateId } from './utils'

/**
 * Generate mock token data
 */
const TOKEN_NAMES = [
  { name: 'Ethereum', symbol: 'ETH' },
  { name: 'Solana', symbol: 'SOL' },
  { name: 'Avalanche', symbol: 'AVAX' },
  { name: 'Polygon', symbol: 'MATIC' },
  { name: 'Cardano', symbol: 'ADA' },
  { name: 'Polkadot', symbol: 'DOT' },
  { name: 'Chainlink', symbol: 'LINK' },
  { name: 'Uniswap', symbol: 'UNI' },
  { name: 'Cosmos', symbol: 'ATOM' },
  { name: 'Algorand', symbol: 'ALGO' },
  { name: 'ApeCoin', symbol: 'APE' },
  { name: 'Axie Infinity', symbol: 'AXS' },
  { name: 'The Sandbox', symbol: 'SAND' },
  { name: 'Decentraland', symbol: 'MANA' },
  { name: 'Gala', symbol: 'GALA' },
  { name: 'Immutable X', symbol: 'IMX' },
  { name: 'Render Token', symbol: 'RNDR' },
  { name: 'Theta Network', symbol: 'THETA' },
  { name: 'Aave', symbol: 'AAVE' },
  { name: 'Compound', symbol: 'COMP' },
  { name: 'Maker', symbol: 'MKR' },
  { name: 'Curve DAO', symbol: 'CRV' },
  { name: 'SushiSwap', symbol: 'SUSHI' },
  { name: 'PancakeSwap', symbol: 'CAKE' },
  { name: 'Fantom', symbol: 'FTM' },
  { name: 'Near Protocol', symbol: 'NEAR' },
  { name: 'Harmony', symbol: 'ONE' },
  { name: 'Zilliqa', symbol: 'ZIL' },
  { name: 'Elrond', symbol: 'EGLD' },
  { name: 'Hedera', symbol: 'HBAR' },
]

const STATUSES: TokenStatus[] = ['new', 'final-stretch', 'migrated']

/**
 * Shuffle array to randomize order
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Generate a single mock token
 */
export function generateMockToken(tokenInfo: { name: string; symbol: string }, index: number): Token {
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)]
  const price = randomBetween(0.01, 1000)
  const priceChange24h = randomBetween(-30, 30)
  
  return {
    id: generateId(),
    name: tokenInfo.name,
    symbol: tokenInfo.symbol,
    status,
    price,
    priceChange24h,
    volume24h: randomBetween(100000, 50000000),
    marketCap: randomBetween(1000000, 1000000000),
    liquidity: randomBetween(50000, 10000000),
    holders: Math.floor(randomBetween(100, 100000)),
    createdAt: Date.now() - Math.floor(randomBetween(0, 30 * 24 * 60 * 60 * 1000)),
    lastUpdated: Date.now(),
    priceDirection: 'neutral',
    logo: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=random`,
    description: `${tokenInfo.name} is a decentralized token with innovative features.`,
    website: `https://${tokenInfo.symbol.toLowerCase()}.com`,
    twitter: `https://twitter.com/${tokenInfo.symbol.toLowerCase()}`,
    telegram: `https://t.me/${tokenInfo.symbol.toLowerCase()}`,
  }
}

/**
 * Generate array of mock tokens with no duplicates
 */
export function generateMockTokens(count: number = 60): Token[] {
  const shuffledTokens = shuffleArray(TOKEN_NAMES)
  
  const tokens: Token[] = []
  const maxUnique = Math.min(count, TOKEN_NAMES.length)
  
  for (let i = 0; i < maxUnique; i++) {
    tokens.push(generateMockToken(shuffledTokens[i], i))
  }
  
  if (count > TOKEN_NAMES.length) {
    const remaining = count - TOKEN_NAMES.length
    for (let i = 0; i < remaining; i++) {
      const tokenInfo = shuffledTokens[i % shuffledTokens.length]
      const uniqueName = `${tokenInfo.name} V${Math.floor(i / shuffledTokens.length) + 2}`
      tokens.push(generateMockToken({ name: uniqueName, symbol: tokenInfo.symbol }, maxUnique + i))
    }
  }
  
  return tokens
}

/**
 * Mock WebSocket service for real-time updates
 */
export class MockWebSocketService {
  private listeners: ((message: WebSocketMessage) => void)[] = []
  private intervalId: NodeJS.Timeout | null = null
  private tokens: Token[] = []

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  /**
   * Connect to mock WebSocket
   */
  connect(): void {
    if (this.intervalId) return

    // Simulate price updates every 2 seconds
    this.intervalId = setInterval(() => {
      this.sendRandomPriceUpdate()
    }, 2000)
  }

  /**
   * Disconnect from mock WebSocket
   */
  disconnect(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  /**
   * Subscribe to WebSocket messages
   */
  subscribe(callback: (message: WebSocketMessage) => void): () => void {
    this.listeners.push(callback)
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  /**
   * Send random price update to all subscribers
   */
  private sendRandomPriceUpdate(): void {
    if (this.tokens.length === 0) return

    const randomToken = this.tokens[Math.floor(Math.random() * this.tokens.length)]
    const priceChange = randomBetween(-5, 5)
    const newPrice = Math.max(0.001, randomToken.price * (1 + priceChange / 100))
    const newPriceChange24h = randomToken.priceChange24h + randomBetween(-2, 2)

    const message: WebSocketMessage = {
      type: 'price-update',
      data: {
        id: randomToken.id,
        price: newPrice,
        priceChange24h: newPriceChange24h,
        lastUpdated: Date.now(),
        priceDirection: priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'neutral',
      },
    }

    // Notify all listeners (Redux will handle the immutable update)
    this.listeners.forEach(listener => listener(message))
  }

  /**
   * Manually trigger a token update
   */
  updateToken(tokenId: string, updates: Partial<Token>): void {
    const message: WebSocketMessage = {
      type: 'price-update',
      data: {
        id: tokenId,
        ...updates,
      },
    }

    this.listeners.forEach(listener => listener(message))
  }
}

/**
 * Singleton instance of mock WebSocket service
 */
let mockWebSocketInstance: MockWebSocketService | null = null

/**
 * Get or create mock WebSocket service instance
 */
export function getMockWebSocketService(tokens: Token[]): MockWebSocketService {
  if (!mockWebSocketInstance) {
    mockWebSocketInstance = new MockWebSocketService(tokens)
  }
  return mockWebSocketInstance
}

