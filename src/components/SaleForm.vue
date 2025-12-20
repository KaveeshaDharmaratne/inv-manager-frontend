<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import type { InvoiceItem, InvoiceDetails } from '@/types/invoice'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

// --- State ---
const invoiceDetails = reactive<Omit<InvoiceDetails, 'items'>>({
  date: new Date().toISOString().split('T')[0] ?? '', // Default to current day
  dealer: '',
  invoiceNumber: '',
})

const newItem = reactive({
  code: '',
  description: '',
  quantity: 1,
})

const addedItems = ref<InvoiceItem[]>([])
const codeInputRef = ref<HTMLInputElement | null>(null)

// --- Constants ---
const inputClass =
  'block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500'

// --- Logic ---

// Auto-populate description when Code changes
watch(
  () => newItem.code,
  (newCode) => {
    const product = productStore.getProductByCode(newCode)
    newItem.description = product?.description ?? ''
  },
)

const addItem = () => {
  // Basic Validation
  if (!newItem.code || newItem.quantity <= 0) return

  // Add to list
  addedItems.value.push({
    id: crypto.randomUUID(),
    code: newItem.code,
    description: newItem.description || 'Unknown Item',
    quantity: newItem.quantity,
  })

  // Clear inputs
  newItem.code = ''
  newItem.description = ''
  newItem.quantity = 1

  // UX: Refocus the code input for rapid entry
  nextTick(() => {
    codeInputRef.value?.focus()
  })
}

const removeItem = (index: number) => {
  addedItems.value.splice(index, 1)
}

const handleSubmit = () => {
  if (addedItems.value.length === 0) {
    alert('Please add at least one item.')
    return
  }
  const payload: InvoiceDetails = {
    ...invoiceDetails,
    items: addedItems.value,
  }
  console.log('Submitting Invoice:', payload)
  // API call would go here
}
</script>

<template>
  <section
    class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Invoice Header Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="date"
            >Date</label
          >
          <div class="relative">
            <input id="date" type="date" v-model="invoiceDetails.date" :class="inputClass" />
          </div>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            for="dealer"
            >Dealer</label
          >
          <input
            id="dealer"
            type="text"
            v-model="invoiceDetails.dealer"
            placeholder="Enter dealer name"
            :class="inputClass"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="invoice"
          >Invoice #</label
        >
        <input
          id="invoice"
          type="text"
          v-model="invoiceDetails.invoiceNumber"
          placeholder="Enter invoice number"
          :class="inputClass"
        />
      </div>

      <!-- Item Entry Section -->
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50"
      >
        <div class="grid grid-cols-[0.6fr_2fr_0.5fr_auto] gap-4 items-end">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              for="code"
              >Code</label
            >
            <input
              ref="codeInputRef"
              id="code"
              type="text"
              v-model="newItem.code"
              @keydown.enter.prevent="addItem"
              placeholder="Item code"
              :class="inputClass"
            />
          </div>
          <div class="relative">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              for="description"
              >Description</label
            >
            <input
              id="description"
              type="text"
              v-model="newItem.description"
              readonly
              placeholder="Item description"
              :class="[inputClass, 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed']"
            />
            <span class="absolute top-0 right-0 text-xs text-gray-400 dark:text-gray-500 font-mono"
              >(Auto)</span
            >
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              for="quantity"
              >Qty</label
            >
            <input
              id="quantity"
              type="number"
              min="1"
              v-model="newItem.quantity"
              @keydown.enter.prevent="addItem"
              :class="inputClass"
            />
          </div>
          <div>
            <button
              type="button"
              @click="addItem"
              class="bg-primary text-white font-medium px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-zinc-900 transition-colors"
            >
              <span class="material-icons-outlined text-xl">add_circle</span>
              Add
            </button>
          </div>
        </div>

        <!-- Added Items List -->
        <div class="invoice-items-list mt-4">
          <div
            v-if="addedItems.length === 0"
            class="text-center py-8 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg"
          >
            No items added yet
          </div>

          <div
            v-else
            class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Qty
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
              >
                <tr v-for="(item, index) in addedItems" :key="item.id">
                  <td
                    class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {{ item.code }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {{ item.description }}
                  </td>
                  <td
                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right"
                  >
                    {{ item.quantity }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      @click="removeItem(index)"
                      class="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      <span class="material-icons-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Submit Action -->
        <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <button
            type="submit"
            :disabled="addedItems.length === 0"
            class="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Invoice
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
