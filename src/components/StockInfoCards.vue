<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import type { StockCardFilter } from '@/types/dashboard'

const store = useDashboardStore()
const { metrics, activeFilter } = storeToRefs(store)

onMounted(() => {
  store.fetchMetrics()
})

const handleCardClick = (filter: StockCardFilter) => {
  store.fetchProducts(filter)
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div
      class="bg-white dark:bg-zinc-900 p-6 rounded-lg border cursor-pointer transition-all"
      :class="
        activeFilter === 'all'
          ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700'
      "
      @click="handleCardClick('all')"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-zinc-500">Total Products</p>
          <p class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
            {{ formatNumber(metrics.totalProducts) }}
          </p>
        </div>
        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
          <span class="material-icons-outlined text-indigo-500 dark:text-indigo-400">widgets</span>
        </div>
      </div>
    </div>
    <div
      class="bg-white dark:bg-zinc-900 p-6 rounded-lg border cursor-pointer transition-all"
      :class="
        activeFilter === 'low-stock'
          ? 'border-yellow-500 ring-2 ring-yellow-200 dark:ring-yellow-800'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-yellow-300 dark:hover:border-yellow-700'
      "
      @click="handleCardClick('low-stock')"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-zinc-500">Items Low in Stock</p>
          <p class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
            {{ formatNumber(metrics.lowStockCount) }}
          </p>
        </div>
        <div class="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
          <span class="material-icons-outlined text-yellow-500 dark:text-yellow-400"
            >warning_amber</span
          >
        </div>
      </div>
    </div>
    <div
      class="bg-white dark:bg-zinc-900 p-6 rounded-lg border cursor-pointer transition-all"
      :class="
        activeFilter === 'out-of-stock'
          ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-800'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-700'
      "
      @click="handleCardClick('out-of-stock')"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-zinc-500">Out of Stock</p>
          <p class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
            {{ formatNumber(metrics.outOfStockCount) }}
          </p>
        </div>
        <div class="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
          <span class="material-icons-outlined text-red-500 dark:text-red-400">error_outline</span>
        </div>
      </div>
    </div>
  </div>
</template>
