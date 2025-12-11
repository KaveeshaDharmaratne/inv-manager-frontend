<script setup lang="ts">
import { useReturnStore } from '@/stores/returns';
import { storeToRefs } from 'pinia';

const store = useReturnStore();
const { form, isSubmitting } = storeToRefs(store);
const { addItem, removeItem, submitReturn } = store;
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Returns</h1>
        <p class="mt-2 text-sm text-gray-500">Log product returns from dealers.</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Date</label>
            <input type="date" v-model="form.date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">R/Type</label>
            <select v-model="form.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
              <option>Good</option>
              <option>Damage</option>
              <option>Expired</option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Dealer</label>
            <input type="text" v-model="form.dealer" placeholder="Enter dealer name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </div>
        </div>

        <div class="mb-10">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Return Note No.</label>
            <input type="text" v-model="form.returnNoteNo" placeholder="e.g., RN-12345"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </div>
        </div>

        <hr class="border-gray-100 mb-8" />

        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Returned Items</h2>

          <div class="space-y-4">
            <div class="hidden sm:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 mb-2">
              <div class="col-span-3">Code</div>
              <div class="col-span-6">Description</div>
              <div class="col-span-2">Qty</div>
              <div class="col-span-1"></div>
            </div>

            <div v-for="(item) in form.items" :key="item.id" class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
              <div class="col-span-12 sm:col-span-3">
                <label class="sm:hidden text-xs text-gray-500 mb-1 block">Code</label>
                <input type="text" v-model="item.code" placeholder="SKU-001"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <label class="sm:hidden text-xs text-gray-500 mb-1 block">Description</label>
                <input type="text" v-model="item.description" placeholder="Product name or description"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
              </div>

              <div class="col-span-12 sm:col-span-2">
                <label class="sm:hidden text-xs text-gray-500 mb-1 block">Qty</label>
                <input type="number" v-model="item.qty" placeholder="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
              </div>

              <div class="col-span-12 sm:col-span-1 flex justify-end sm:justify-center pt-2">
                <button @click="removeItem(item.id)" class="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove Item">
                  <span class="material-icons-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>

          <button @click="addItem"
            class="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            <span class="material-icons-outlined text-lg">add_circle_outline</span>
            Add Another Item
          </button>
        </div>

        <hr class="border-gray-100 mb-8" />

        <div class="flex justify-end">
          <button @click="submitReturn" :disabled="isSubmitting"
            class="bg-indigo-600 text-white px-6 py-2.5 rounded-md font-medium text-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isSubmitting ? 'Submitting...' : 'Submit Return' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
