<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import { useGdnStore } from '@/stores/gdn'
import DealerAutocomplete from './DealerAutocomplete.vue'

const store = useGdnStore()
const { form, newItem, isSubmitting } = storeToRefs(store)
const { addItem, removeItem, submitGdn } = store

const codeInputRef = ref<HTMLInputElement | null>(null)

const inputClass =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500'

const handleAddItem = async () => {
  const success = await addItem()
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

  submitGdn()
}
</script>

<template>
  <div>
    <section
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="gdn-date"
              >Date</label
            >
            <input id="gdn-date" v-model="form.date" type="date" :class="inputClass" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="gdn-number"
              >GDN #</label
            >
            <input
              id="gdn-number"
              v-model="form.gdnNumber"
              type="text"
              placeholder="Enter GDN number"
              :class="inputClass"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Dealer</label>
            <DealerAutocomplete v-model="form.dealer" placeholder="Enter dealer name" />
          </div>
        </div>

        <div
          class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50"
        >
          <div class="grid grid-cols-[0.6fr_2fr_0.5fr_auto] gap-4 items-end">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300" for="gdn-code"
                >Code</label
              >
              <input
                id="gdn-code"
                ref="codeInputRef"
                v-model="newItem.code"
                type="text"
                placeholder="Item code"
                :class="inputClass"
                @keydown.enter.prevent="handleAddItem"
              />
            </div>

            <div class="relative flex flex-col gap-2">
              <label
                class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                for="gdn-description"
                >Description</label
              >
              <input
                id="gdn-description"
                v-model="newItem.description"
                type="text"
                readonly
                placeholder="Item description"
                :class="[inputClass, 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed']"
              />
              <span
                class="absolute top-0 right-0 text-xs text-gray-400 dark:text-gray-500 font-mono"
                >(Auto)</span
              >
            </div>

            <div class="flex flex-col gap-2">
              <label
                class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                for="gdn-quantity"
                >Qty</label
              >
              <input
                id="gdn-quantity"
                v-model="newItem.quantity"
                type="number"
                min="1"
                :class="inputClass"
                @keydown.enter.prevent="handleAddItem"
              />
            </div>

            <div class="pb-0.5">
              <button
                type="button"
                class="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-900 transition-colors"
                @click="handleAddItem"
              >
                <span class="material-icons-outlined text-xl">add_circle</span>
                Add
              </button>
            </div>
          </div>

          <div class="mt-4">
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
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Code
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Qty
                    </th>
                    <th
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
                    <td
                      class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                    >
                      {{ item.description }}
                    </td>
                    <td
                      class="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-300"
                    >
                      {{ item.quantity }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        class="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        @click="removeItem(index)"
                      >
                        <span class="material-icons-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button
              type="submit"
              :disabled="form.items.length === 0 || isSubmitting"
              class="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ isSubmitting ? 'Submitting...' : 'Submit GDN' }}
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
