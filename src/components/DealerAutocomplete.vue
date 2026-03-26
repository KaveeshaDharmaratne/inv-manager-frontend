<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { searchDealers } from '@/api/dealers'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search...' },
})

const emit = defineEmits(['update:modelValue'])

const query = ref(props.modelValue)
const results = ref<Array<{ id: string; name: string }>>([])
const open = ref(false)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.modelValue,
  (v) => {
    if (v !== query.value) query.value = v
  },
)

watch(query, (val) => {
  emit('update:modelValue', val)
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!val || val.trim().length === 0) {
    results.value = []
    open.value = false
    return
  }

  debounceTimer = setTimeout(async () => {
    try {
      const data = await searchDealers(val, 10)
      results.value = data.map((d: any) => ({ id: d.id, name: d.name }))
      open.value = results.value.length > 0
    } catch (err) {
      results.value = []
      open.value = false
    }
  }, 300)
})

function selectDealer(d: { id: string; name: string }) {
  query.value = d.name
  emit('update:modelValue', d.name)
  open.value = false
}

const showClear = computed(() => !!query.value)

function clear() {
  query.value = ''
  results.value = []
  open.value = false
}
</script>

<template>
  <div class="relative">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="query"
      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
      @focus="open = results.length > 0"
    />

    <button
      v-if="showClear"
      type="button"
      class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
      @click="clear"
      aria-label="Clear"
    >
      ✕
    </button>

    <ul
      v-if="open"
      class="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto"
    >
      <li
        v-for="d in results"
        :key="d.id"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        @click="selectDealer(d)"
      >
        {{ d.name }}
      </li>
    </ul>
  </div>
</template>
