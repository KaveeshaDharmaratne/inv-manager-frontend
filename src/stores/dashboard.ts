import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StockMetrics, ProductItem, StockCardFilter } from '@/types/dashboard'
import apiClient from '@/api/axios'

export const useDashboardStore = defineStore('dashboard', () => {
  const metrics = ref<StockMetrics>({
    totalProducts: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
  })

  const activeFilter = ref<StockCardFilter>(null)
  const products = ref<ProductItem[]>([])
  const isLoadingProducts = ref(false)

  const fetchMetrics = async () => {
    try {
      const response = await apiClient.get<StockMetrics>('/stock-overview/metrics')
      metrics.value = response.data
    } catch (err) {
      console.error('Failed to fetch metrics:', err)
    }
  }

  const fetchProducts = async (filter: StockCardFilter) => {
    if (!filter) {
      products.value = []
      activeFilter.value = null
      return
    }

    // Toggle off if same filter clicked again
    if (activeFilter.value === filter) {
      products.value = []
      activeFilter.value = null
      return
    }

    isLoadingProducts.value = true
    activeFilter.value = filter

    try {
      const response = await apiClient.get<ProductItem[]>(`/stock-overview/products/${filter}`)
      products.value = response.data
    } catch (err) {
      console.error('Failed to fetch products:', err)
      products.value = []
    } finally {
      isLoadingProducts.value = false
    }
  }

  return {
    metrics,
    activeFilter,
    products,
    isLoadingProducts,
    fetchMetrics,
    fetchProducts,
  }
})
