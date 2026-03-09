import apiClient from './axios'
import type { InvoiceDetails } from '@/types/invoice'

export interface CreateInvoicePayload {
  invoiceNumber: string
  date: string
  dealer: string
  items: { code: string; description: string; quantity: number }[]
}

export interface GetInvoicesParams {
  offset?: number
  limit?: number
  search?: string
  dealer?: string
  expand?: string
}

function buildPayload(form: InvoiceDetails): CreateInvoicePayload {
  return {
    invoiceNumber: form.invoiceNumber,
    date: form.date,
    dealer: form.dealer,
    items: form.items.map((item) => ({
      code: item.code,
      description: item.description,
      quantity: item.quantity,
    })),
  }
}

export function createInvoice(form: InvoiceDetails) {
  const payload = buildPayload(form)
  return apiClient.post('/api/v1/invoices', payload)
}

export function fetchInvoices(params: GetInvoicesParams = {}) {
  return apiClient.get('/api/v1/invoices', { params })
}

export function fetchInvoiceByNumber(invoiceNumber: string, expand?: string) {
  return apiClient.get(`/api/v1/invoices/${encodeURIComponent(invoiceNumber)}`, {
    params: expand ? { expand } : undefined,
  })
}

export function updateInvoice(invoiceNumber: string, data: Partial<CreateInvoicePayload>) {
  return apiClient.patch(`/api/v1/invoices/${encodeURIComponent(invoiceNumber)}`, data)
}

export function deleteInvoice(invoiceNumber: string) {
  return apiClient.delete(`/api/v1/invoices/${encodeURIComponent(invoiceNumber)}`)
}
