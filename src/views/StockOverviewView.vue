<script setup lang="ts">
import { onMounted, computed } from 'vue'
import StockInfoCards from '../components/StockInfoCards.vue'
import StockFilterBar from '../components/StockFilterBar.vue'
import StockOverviewTable from '../components/StockOverviewTable.vue'
import { useStockStore } from '../stores/stockStore'
import { useDashboardStore } from '../stores/dashboard'
import { storeToRefs } from 'pinia'

const stockStore = useStockStore()
const dashboardStore = useDashboardStore()
const { activeFilter, products, isLoadingProducts } = storeToRefs(dashboardStore)

const filterLabel = computed(() => {
  switch (activeFilter.value) {
    case 'all':
      return 'All Products'
    case 'low-stock':
      return 'Low Stock Items'
    case 'out-of-stock':
      return 'Out of Stock Items'
    default:
      return ''
  }
})

onMounted(() => {
  stockStore.fetchRecentTransactions()
})

const handlePageChange = (page: number) => {
  stockStore.fetchRecentTransactions(page)
}

const handleApplyFilters = (filters: { startDate?: string | null; endDate?: string | null; type?: string | null }) => {
  stockStore.fetchRecentTransactions(1, { startDate: filters.startDate ?? null, endDate: filters.endDate ?? null, type: filters.type ?? null })
}

const handleClearFilters = () => {
  stockStore.fetchRecentTransactions(1, { startDate: null, endDate: null, type: null })
}
</script>

<template>
  <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 lg:py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Stock Overview
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Welcome back, here's a look at your inventory.
          </p>
        </div>
      </div>
      <StockInfoCards />

      <!-- Products table shown when a card is clicked -->
      <div v-if="activeFilter" class="mt-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ filterLabel }}</h3>
        <div
          class="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden"
        >
          <div v-if="isLoadingProducts" class="px-6 py-4 text-center text-sm text-gray-500">
            Loading products...
          </div>
          <div v-else class="overflow-x-auto">
            <table class="min-w-[540px] w-full divide-y divide-gray-200 dark:divide-zinc-700">
              <thead class="bg-gray-50 dark:bg-zinc-800">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-700"
              >
                <tr
                  v-for="product in products"
                  :key="product.code"
                  class="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {{ product.code }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-zinc-400">
                    {{ product.description || '-' }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm"
                    :class="
                      product.quantity === 0
                        ? 'text-red-600 font-semibold'
                        : product.quantity < 10
                          ? 'text-yellow-600 font-semibold'
                          : 'text-gray-900 dark:text-white'
                    "
                  >
                    {{ product.quantity }}
                  </td>
                </tr>
                <tr v-if="products.length === 0">
                  <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <StockFilterBar @apply="handleApplyFilters" @clear="handleClearFilters" />

        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h3>
        <StockOverviewTable
          :transactions="stockStore.transactions"
          :current-page="stockStore.currentPage"
          :total-pages="stockStore.totalPages"
          :is-loading="stockStore.isLoading"
          :error="stockStore.error"
          @change-page="handlePageChange"
        />
      </div>
    </div>
  </main>
</template>
