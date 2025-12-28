<script setup lang="ts">
import { computed } from 'vue'
import { format, parseISO } from 'date-fns'
import type { StockTransaction } from '@/types/stock'

const props = defineProps<{
  transactions: StockTransaction[]
}>()

const sortedTransactions = computed(() => {
  return [...props.transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'dd/MM/yyyy')
  } catch {
    return dateString
  }
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
          <tr
            v-for="entry in sortedTransactions"
            :key="entry.id"
            class="hover:bg-gray-50 transition-colors"
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
          <tr v-if="sortedTransactions.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
              No transactions found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
