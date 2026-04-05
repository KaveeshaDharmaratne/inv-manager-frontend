export interface LedgerEntry {
  date: string // ISO date string eg. '2024-06-15'
  transactionType: string
  transactionNo: string
  dealer: string
  inQty?: number | null
  outQty?: number | null
  balance: number
}

export interface LedgerFilter {
  fromDate: string
  toDate: string
  productCode?: string
}

export interface LedgerProduct {
  item: { code: string; description: string }
  openingStock: number
  entries: LedgerEntry[]
  totalIn: number
  totalOut: number
  closingBalance: number
}

export interface LedgerResponse {
  products: LedgerProduct[]
}
