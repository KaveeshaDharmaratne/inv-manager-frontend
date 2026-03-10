<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useReturnStore } from '../stores/returns'
import { storeToRefs } from 'pinia'

const store = useReturnStore()
const { form, newItem, isSubmitting, successMessage, errorMessage } = storeToRefs(store)
const { addItem, removeItem, submitReturn } = store

const codeInputRef = ref<HTMLInputElement | null>(null)

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500'

const handleAddItem = () => {
  const success = addItem()
  if (success) {
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
  submitReturn()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Returns</h1>
        <p class="mt-2 text-sm text-gray-500">Log product returns from dealers.</p>
      </div>

      <!-- Feedback Alerts -->
      <div v-if="successMessage" class="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error submitting return</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Date</label>
            <input
              type="date"
              v-model="form.date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">R/Type</label>
            <select
              v-model="form.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option>Good</option>
              <option>Damage</option>
              <option>Expired</option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Dealer</label>
            <input
              type="text"
              v-model="form.dealer"
              placeholder="Enter dealer name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div class="mb-10">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Return Note No.</label>
            <input
              type="text"
              v-model="form.returnNoteNo"
              placeholder="e.g., RN-12345"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <hr class="border-gray-100 mb-8" />

        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Returned Items</h2>

          <!-- Item Entry Section -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
            <div class="grid grid-cols-[0.6fr_2fr_0.5fr_auto] gap-4 items-end">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Code</label>
                <input
                  ref="codeInputRef"
                  type="text"
                  v-model="newItem.code"
                  @keydown.enter.prevent="handleAddItem"
                  placeholder="Item code"
                  :class="inputClass"
                />
              </div>
              <div class="relative flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                <input
                  type="text"
                  v-model="newItem.description"
                  readonly
                  placeholder="Item description"
                  :class="[inputClass, 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed']"
                />
                <span class="absolute top-0 right-0 text-xs text-gray-400 dark:text-gray-500 font-mono">(Auto)</span>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Qty</label>
                <input
                  type="number"
                  min="1"
                  v-model="newItem.qty"
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
            <div class="mt-4">
              <div
                v-if="form.items.length === 0"
                class="text-center py-8 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg"
              >
                No items added yet
              </div>

              <div v-else class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Code</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Qty</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="(item, index) in form.items" :key="item.id">
                      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ item.code }}</td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ item.description }}</td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">{{ item.qty }}</td>
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
          </div>
        </div>

        <hr class="border-gray-100 mb-8" />

        <div class="flex justify-end">
          <button
            @click="handleSubmit"
            :disabled="isSubmitting || form.items.length === 0"
            class="bg-indigo-600 text-white px-6 py-2.5 rounded-md font-medium text-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit Return' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
