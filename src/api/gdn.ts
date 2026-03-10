import apiClient from './axios'
import type { GdnFormState } from '@/types/gdn'

export interface CreateGdnPayload {
  gdnNumber: string
  date: string
  items: { code: string; description: string; quantity: number }[]
}

function buildPayload(form: GdnFormState): CreateGdnPayload {
  return {
    gdnNumber: form.gdnNumber,
    date: form.date,
    items: form.items.map((item) => ({
      code: item.code,
      description: item.description,
      quantity: item.quantity,
    })),
  }
}

export function createGdn(form: GdnFormState) {
  const payload = buildPayload(form)
  return apiClient.post('/api/v1/gdns', payload)
}
