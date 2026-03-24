<script setup lang="ts">
import { computed } from 'vue'
import { format, parseISO } from 'date-fns'
import type { StockTransaction } from '../types/stock'
import { useRouter } from 'vue-router'

const props = defineProps<{
  transactions: StockTransaction[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits<(event: 'change-page', page: number) => void>()

const sortedTransactions = computed(() => {
  return [...props.transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

const pageNumbers = computed(() => {
  const maxPages = Math.min(props.totalPages, 5)
  return Array.from({ length: maxPages }, (_, index) => index + 1)
})

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage || props.isLoading) {
    return
  }
  emit('change-page', page)
}

const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'dd/MM/yyyy')
  } catch {
    return dateString
  }
}

const router = useRouter()

const openTransaction = (entry: StockTransaction) => {
  // entry.type should match Invoice/Return/GDN
  router.push({ name: 'transaction-view', params: { type: entry.type, id: entry.transactionId } })
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              DATE
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              TRANSACTION TYPE
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              TRANSACTION NO
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              DEALER
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="isLoading">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
              Loading recent transactions...
            </td>
          </tr>
          <tr v-else-if="error">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-red-600">
              {{ error }}
            </td>
          </tr>
          <tr
            v-for="entry in sortedTransactions"
            :key="entry.id"
            class="hover:bg-gray-50 transition-colors cursor-pointer"
            @click="openTransaction(entry)"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {{ formatDate(entry.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ entry.type }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ entry.transactionId }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ entry.dealer || '-' }}
            </td>
          </tr>
          <tr v-if="!isLoading && !error && sortedTransactions.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
              No transactions found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="totalPages > 1"
      class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
    >
      <button
        class="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage === 1 || isLoading"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>

      <div class="flex items-center gap-2">
        <button
          v-for="page in pageNumbers"
          :key="page"
          class="rounded-md px-3 py-1.5 text-sm"
          :class="
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          "
          :disabled="isLoading"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="currentPage === totalPages || isLoading"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
