export interface InvoiceItem {
  product: Product
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
