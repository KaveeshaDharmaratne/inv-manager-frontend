import type { LedgerFilter, LedgerProduct, LedgerResponse } from '@/types/ledger'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/axios'

export const useLedgerStore = defineStore('ledger', () => {
  const products = ref<LedgerProduct[]>([])
  const isLoading = ref(false)

  // --- Actions ---
  async function fetchEntries(filter: LedgerFilter) {
    if (!filter.fromDate || !filter.toDate) {
      products.value = []
      return
    }

    isLoading.value = true
    try {
      const normalizedProductCode = filter.productCode?.trim()
      const { data } = await apiClient.get<LedgerResponse>('/api/v1/items/ledger', {
        params: {
          from: filter.fromDate,
          to: filter.toDate,
          productCode: normalizedProductCode || undefined,
        },
      })
      products.value = data.products ?? []
    } catch (err) {
      console.error('Failed to fetch ledger entries', err)
      products.value = []
    } finally {
      isLoading.value = false
    }
  }

  return { products, isLoading, fetchEntries }
})
