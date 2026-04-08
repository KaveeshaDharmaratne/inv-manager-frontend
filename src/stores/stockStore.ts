import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/axios'
import type { PaginatedStockTransactions, StockTransaction } from '@/types/stock'
import { format, startOfMonth } from 'date-fns'

export const useStockStore = defineStore('stock', () => {
  const now = new Date()
  const transactions = ref<StockTransaction[]>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalTransactions = ref(0)
  const pageSize = ref(10)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const startDate = ref<string | null>(format(startOfMonth(now), 'yyyy-MM-dd'))
  const endDate = ref<string | null>(format(now, 'yyyy-MM-dd'))
  const transactionType = ref<string | null>(null)

  function addTransaction(transaction: StockTransaction) {
    transactions.value.push(transaction)
  }

  async function fetchRecentTransactions(page = 1, filters?: { startDate?: string | null; endDate?: string | null; type?: string | null }) {
    isLoading.value = true
    error.value = null

    // persist filters in store
    if (filters) {
      startDate.value = filters.startDate ?? null
      endDate.value = filters.endDate ?? null
      transactionType.value = filters.type ?? null
    }

    try {
      const response = await apiClient.get<PaginatedStockTransactions>(
        '/stock-overview/list-transactions',
        {
          params: {
            page,
            limit: 10,
            sortBy: 'date',
            sortOrder: 'desc',
            startDate: startDate.value || undefined,
            endDate: endDate.value || undefined,
            type: transactionType.value || undefined,
          },
        },
      )

      const payload = response.data

      transactions.value = payload.data.map((entry) => ({
        id: `${entry.type}-${entry.transactionId}-${entry.date}`,
        ...entry,
      }))

      currentPage.value = payload.page
      totalPages.value = payload.totalPages
      totalTransactions.value = payload.total
      pageSize.value = payload.limit
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to load recent transactions.'
      transactions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    transactions,
    currentPage,
    totalPages,
    totalTransactions,
    pageSize,
    isLoading,
    error,
    startDate,
    endDate,
    transactionType,
    addTransaction,
    fetchRecentTransactions,
  }
})
