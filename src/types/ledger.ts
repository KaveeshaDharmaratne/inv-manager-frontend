export interface LedgerEntry {
  id: string
  date: string // ISO date string eg. '2024-06-15'
  transactionType: 'INV' | 'GRN' | 'ADJ' // Union type for transaction types
  transactionNo: string
  dealer: string
  inQty?: number // Optional property
  outQty?: number // Optional property
  balance: number
}

export interface LedgerFilter {
  fromDate: string
  toDate: string
  productCode: string
  description: string
}
