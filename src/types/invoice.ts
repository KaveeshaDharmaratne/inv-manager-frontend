export interface InvoiceItem {
  id: string
  code: string
  description: string
  quantity: number
}

export interface Product {
  code: string
  description: string
}

export interface InvoiceDetails {
  date: string
  dealer: string
  invoiceNumber: string
  items: InvoiceItem[]
}
