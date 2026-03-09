import apiClient from './axios'
import type { ReturnFormState } from '@/types/returns'

export interface CreateReturnPayload {
  date: string
  type: string
  dealer: string
  returnNoteNo: string
  items: { code: string; description: string; qty: number }[]
}

function buildPayload(form: ReturnFormState): CreateReturnPayload {
  const validItems = form.items.filter((item) => item.code && item.qty !== null)
  return {
    date: form.date,
    type: form.type,
    dealer: form.dealer,
    returnNoteNo: form.returnNoteNo,
    items: validItems.map((item) => ({
      code: item.code,
      description: item.description,
      qty: Number(item.qty),
    })),
  }
}

export function createReturn(form: ReturnFormState) {
  const payload = buildPayload(form)
  if (payload.items.length === 0) {
    return Promise.reject(new Error('Please add at least one valid item with a code and quantity.'))
  }
  return apiClient.post('/api/v1/returns', payload)
}

export function fetchReturns() {
  return apiClient.get('/api/v1/returns')
}

export function fetchReturnById(id: string) {
  return apiClient.get(`/api/v1/returns/${encodeURIComponent(id)}`)
}
