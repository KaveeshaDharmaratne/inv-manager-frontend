export interface StockMetrics {
  totalProducts: number
  lowStockCount: number
  outOfStockCount: number
}

export interface ProductItem {
  code: string
  description: string
  quantity: number
}

export type StockCardFilter = 'all' | 'low-stock' | 'out-of-stock' | null
