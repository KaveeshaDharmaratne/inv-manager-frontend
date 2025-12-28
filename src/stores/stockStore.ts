import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StockTransaction } from '@/types/stock'

export const useStockStore = defineStore('stock', () => {
  const transactions = ref<StockTransaction[]>([])

  function addTransaction(transaction: StockTransaction) {
    transactions.value.push(transaction)
  }

  return {
    transactions,
    addTransaction,
  }
})
