export interface StockTransaction {
  id: string
  date: string
  type: string
  transactionId: string
  dealer?: string
}

export interface PaginatedStockTransactions {
  data: Omit<StockTransaction, 'id'>[]
  total: number
  page: number
  limit: number
  totalPages: number
}
