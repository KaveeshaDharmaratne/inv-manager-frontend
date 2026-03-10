<script setup lang="ts">
import type { LedgerEntry } from '@/types/ledger'
import { format, parseISO } from 'date-fns'

const props = defineProps<{
  entries: LedgerEntry[]
  totalBalance: number
}>()

const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'dd/MM/yyyy')
}

const typeLabel = (type: string) => {
  switch (type) {
    case 'INV':
      return 'Invoice'
    case 'RET':
      return 'Good Return'
    case 'DMG':
      return 'Damage Return'
    case 'EXP':
      return 'Expired Return'
    default:
      return type
  }
}

const typeBadgeClass = (type: string) => {
  switch (type) {
    case 'INV':
      return 'bg-blue-100 text-blue-700'
    case 'RET':
      return 'bg-emerald-100 text-emerald-700'
    case 'DMG':
      return 'bg-amber-100 text-amber-700'
    case 'EXP':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div v-if="entries.length === 0" class="py-12 text-center text-gray-400 text-sm">
      No transactions found. Select a product code and date range, then click Submit.
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Transaction No
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Dealer
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              In (+)
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Out (-)
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Balance
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(entry, idx) in entries" :key="idx" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              {{ formatDate(entry.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="typeBadgeClass(entry.transactionType)"
              >
                {{ typeLabel(entry.transactionType) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ entry.transactionNo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ entry.dealer ?? '-' }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-emerald-600"
            >
              {{ entry.inQty || '-' }}
            </td>
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
              Closing Balance
            </td>
            <td class="px-6 py-4 text-right text-sm font-bold text-gray-900">
              {{ totalBalance }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
