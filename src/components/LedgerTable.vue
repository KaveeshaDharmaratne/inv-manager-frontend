<script setup lang="ts">
import type { LedgerEntry } from '@/types/ledger'
import { format, parseISO } from 'date-fns'

// Props
defineProps<{
  entries: LedgerEntry[]
}>()

// Helper to format date
const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'dd/MM/yyyy')
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
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              +
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              -
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              BALANCE
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="entry in entries" :key="entry.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {{ formatDate(entry.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ entry.transactionType }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ entry.transactionNo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ entry.dealer }}</td>

            <!--Conditional Class: Green if value exists-->
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-emerald-600"
            >
              {{ entry.inQty || '-' }}
            </td>

            <!--Conditional Class: Red if value exists-->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-red-500">
              {{ entry.outQty || '-' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">
              {{ entry.balance }}
            </td>
          </tr>
          <!-- Footer Row -->
          <tr class="bg-gray-50 border-t-2 border-gray-200">
            <td
              colspan="6"
              class="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider"
            >
              TOTAL
            </td>
            <td class="px-6 py-4 text-right text-sm font-bold text-gray-900">
              TOTAL_BALANCE_DYNAMIC
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
