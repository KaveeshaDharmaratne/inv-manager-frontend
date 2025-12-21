import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StockMetrics } from '@/types/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  // Initial State(Mock Data)
  const metrics = ref<StockMetrics>({
    totalProducts: 1200,
    newProductsCount: 60,
    lowStockCount: 40,
    urgentReorderCount: 30,
    outOfStockCount: 16,
    totalStockValue: 630000,
  })

  let intervalId: number | null = null

  // --- Actions ---
  const fetchMetrics = async () => {
    // Simulate API call here
    console.log('Fetching dashboard metrics...')
  }

  // Simulate realtime updates
  const startRealtimeUpdates = () => {
    if (intervalId) return

    intervalId = window.setInterval(() => {
      // Simulate random fluctuations
      metrics.value.totalProducts = Math.max(
        0,
        metrics.value.totalProducts + Math.floor(Math.random() * 3) - 1,
      )
      metrics.value.lowStockCount = Math.max(
        0,
        metrics.value.lowStockCount + Math.floor(Math.random() * 3) - 1,
      )
      // Random toggle low stock count
      if (Math.random() > 0.7) {
        metrics.value.lowStockCount += Math.floor(Math.random() * 3) - 1
      }
    }, 3000) // Update every 3 seconds
  }

  const stopRealtimeUpdates = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    metrics,
    fetchMetrics,
    startRealtimeUpdates,
    stopRealtimeUpdates,
  }
})
