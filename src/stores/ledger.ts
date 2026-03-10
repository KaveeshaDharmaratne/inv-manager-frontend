import type { LedgerEntry, LedgerFilter } from '@/types/ledger'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import apiClient from '@/api/axios'

export const useLedgerStore = defineStore('ledger', () => {
  const entries = ref<LedgerEntry[]>([])
  const isLoading = ref(false)
  const itemDescription = ref('')

  // --- Actions ---
  async function fetchEntries(filter: LedgerFilter) {
    if (!filter.productCode || !filter.fromDate || !filter.toDate) {
      entries.value = []
      itemDescription.value = ''
      return
    }

    isLoading.value = true
    try {
      const { data } = await apiClient.get(
        `/api/v1/items/${encodeURIComponent(filter.productCode)}/ledger`,
        { params: { from: filter.fromDate, to: filter.toDate } },
      )
      entries.value = data.entries ?? []
      itemDescription.value = data.item?.description ?? ''
    } catch (err) {
      console.error('Failed to fetch ledger entries', err)
      entries.value = []
      itemDescription.value = ''
    } finally {
      isLoading.value = false
    }
  }

  // --- Getters ---
  const currentBalance = computed(() => {
    if (entries.value.length === 0) return 0
    return entries.value[entries.value.length - 1]?.balance ?? 0
  })

  return { entries, isLoading, itemDescription, fetchEntries, currentBalance }
})
