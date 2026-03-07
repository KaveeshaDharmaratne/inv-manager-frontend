import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/axios'
import type { PaginatedStockTransactions, StockTransaction } from '@/types/stock'

export const useStockStore = defineStore('stock', () => {
  const transactions = ref<StockTransaction[]>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalTransactions = ref(0)
  const pageSize = ref(10)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function addTransaction(transaction: StockTransaction) {
    transactions.value.push(transaction)
  }

  async function fetchRecentTransactions(page = 1) {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient.get<PaginatedStockTransactions>(
        '/stock-overview/list-transactions',
        {
          params: {
            page,
            limit: 10,
            sortBy: 'date',
            sortOrder: 'desc',
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
    addTransaction,
    fetchRecentTransactions,
  }
})
