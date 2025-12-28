<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useSaleStore } from '@/stores/sales'
import { storeToRefs } from 'pinia'

const store = useSaleStore()
const { form, newItem } = storeToRefs(store)
const { addItem, removeItem, submitSale } = store

const codeInputRef = ref<HTMLInputElement | null>(null)

// --- Constants ---
const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500'

// --- Logic ---

const handleAddItem = () => {
  const success = addItem()
  if (success) {
    // UX: Refocus the code input for rapid entry
    nextTick(() => {
      codeInputRef.value?.focus()
    })
  }
}

const handleSubmit = () => {
  if (form.value.items.length === 0) {
    alert('Please add at least one item.')
    return
  }
  submitSale()
}
</script>

<template>
  <section
    class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Invoice Header Details -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="date"
            >Date</label
          >
          <div class="relative">
            <input id="date" type="date" v-model="form.date" :class="inputClass" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="dealer"
            >Dealer</label
          >
          <input
            id="dealer"
            type="text"
            v-model="form.dealer"
            placeholder="Enter dealer name"
            :class="inputClass"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="invoice"
            >Invoice #</label
          >
          <input
            id="invoice"
            type="text"
            v-model="form.invoiceNumber"
            placeholder="Enter invoice number"
            :class="inputClass"
          />
        </div>
      </div>

      <!-- Item Entry Section -->
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50"
      >
        <div class="grid grid-cols-[0.6fr_2fr_0.5fr_auto] gap-4 items-end">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="code"
              >Code</label
            >
            <input
              ref="codeInputRef"
              id="code"
              type="text"
              v-model="newItem.code"
              @keydown.enter.prevent="handleAddItem"
              placeholder="Item code"
              :class="inputClass"
            />
          </div>
          <div class="relative flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="description"
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
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="quantity"
              >Qty</label
            >
            <input
              id="quantity"
              type="number"
              min="1"
              v-model="newItem.quantity"
              @keydown.enter.prevent="handleAddItem"
              :class="inputClass"
            />
          </div>
          <div class="pb-0.5">
            <button
              type="button"
              @click="handleAddItem"
              class="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-900 transition-colors"
            >
              <span class="material-icons-outlined text-xl">add_circle</span>
              Add
            </button>
          </div>
        </div>

        <!-- Added Items List -->
        <div class="invoice-items-list mt-4">
          <div
            v-if="form.items.length === 0"
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
                <tr v-for="(item, index) in form.items" :key="item.id">
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
            :disabled="form.items.length === 0"
            class="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Invoice
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
