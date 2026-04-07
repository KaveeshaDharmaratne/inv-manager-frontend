<script setup lang="ts">
import type { LedgerProduct } from '@/types/ledger'
import { format, parseISO } from 'date-fns'

const props = defineProps<{
  productLedgers: LedgerProduct[]
}>()

const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'yyyy-MMM-dd')
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
    case 'BAD':
      return 'Bad Return'
    case 'GDN':
      return 'GDN'
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
    case 'BAD':
      return 'bg-zinc-200 text-zinc-700'
    case 'GDN':
      return 'bg-cyan-100 text-cyan-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div v-if="productLedgers.length === 0" class="py-12 text-center text-gray-400 text-sm">
      No transactions found for the selected period.
    </div>
    <div v-else class="space-y-6 md:space-y-8 p-3 sm:p-4 md:p-6">
      <section
        v-for="product in productLedgers"
        :key="product.item.code"
        class="rounded-lg border border-gray-200 overflow-hidden"
      >
        <div class="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <p>
              <span class="font-semibold text-gray-700">Product Code:</span>
              <span class="text-gray-900 ml-1">{{ product.item.code }}</span>
            </p>
            <p>
              <span class="font-semibold text-gray-700">Description:</span>
              <span class="text-gray-900 ml-1">{{ product.item.description || '-' }}</span>
            </p>
            <p>
              <span class="font-semibold text-gray-700">Opening Stock:</span>
              <span class="text-gray-900 ml-1">{{ product.openingStock }}</span>
            </p>
            <p>
              <span class="font-semibold text-gray-700">Closing Stock:</span>
              <span class="text-gray-900 ml-1">{{ product.closingBalance }}</span>
            </p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-[900px] w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Document Date</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Document Type</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Document No</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Dealer</th>
                <th class="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase">Unit</th>
                <th class="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">Receipts</th>
                <th class="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">Issues</th>
                <th class="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase">Balance</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(entry, idx) in product.entries"
                :key="`${entry.transactionNo}-${entry.date}-${idx}`"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-2 text-sm text-gray-900">{{ formatDate(entry.date) }}</td>
                <td class="px-4 py-2 text-sm">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="typeBadgeClass(entry.transactionType)"
                  >
                    {{ typeLabel(entry.transactionType) }}
                  </span>
                </td>
                <td class="px-4 py-2 text-sm text-gray-700">{{ entry.transactionNo }}</td>
                <td class="px-4 py-2 text-sm text-gray-900">{{ entry.dealer || '-' }}</td>
                <td class="px-4 py-2 text-sm text-center text-gray-600">NOS</td>
                <td class="px-4 py-2 text-sm text-right text-emerald-700">{{ entry.inQty ?? 0 }}</td>
                <td class="px-4 py-2 text-sm text-right text-red-600">{{ entry.outQty ?? 0 }}</td>
                <td class="px-4 py-2 text-sm text-right font-semibold text-gray-900">
                  {{ entry.balance }}
                </td>
              </tr>
              <tr class="bg-gray-50 font-semibold text-gray-800">
                <td colspan="5" class="px-4 py-2 text-right text-sm">Total</td>
                <td class="px-4 py-2 text-right text-sm">{{ product.totalIn }}</td>
                <td class="px-4 py-2 text-right text-sm">{{ product.totalOut }}</td>
                <td class="px-4 py-2 text-right text-sm">{{ product.closingBalance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
