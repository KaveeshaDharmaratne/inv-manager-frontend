<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import type { NavItem } from '@/types/navigation'

const route = useRoute()

const navItems = ref<NavItem[]>([
  {
    label: 'Stock',
    icon: 'inventory',
    expanded: true,
    children: [
      { label: 'Stock Overview', to: '/stock' },
      { label: 'Damage', to: '/damage' },
    ],
  },
  {
    label: 'Transactions',
    icon: 'receipt_long',
    expanded: false,
    children: [
      { label: 'Sale', to: '/sale' },
      { label: 'Return', to: '/return' },
    ],
  },
  {
    label: 'Reports',
    icon: 'assessment',
    expanded: false,
    children: [
      { label: 'Stock Report', to: '/reports/stock' },
      { label: 'Bin Report', to: '/ledger' },
      { label: 'Daily Stock', to: '/reports/daily' },
    ],
  },
])

const toggleExpand = (item: NavItem) => {
  item.expanded = !item.expanded
}

watch(
  () => route.path,
  (newPath) => {
    navItems.value.forEach((item) => {
      if (item.children.some((child) => child.to === newPath)) {
        item.expanded = true
      }
    })
  },
  { immediate: true },
)
</script>

<template>
  <nav class="flex-1 p-4 space-y-1">
    <div v-for="(item, index) in navItems" :key="index">
      <button
        @click="toggleExpand(item)"
        :class="[
          'w-full flex items-center justify-between p-2 rounded font-medium transition-colors',
          'text-zinc-600 dark:text-zinc-400',
          item.children.some((child) => child.to === route.path)
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
            : '',
          'hover:bg-indigo-700 hover:text-white',
        ]"
      >
        <span class="flex items-center gap-3">
          <span class="material-icons-outlined text-xl">{{ item.icon }}</span>
          {{ item.label }}
        </span>
        <span class="material-icons-outlined text-lg">
          {{ item.expanded ? 'expand_less' : 'expand_more' }}
        </span>
      </button>
      <div v-show="item.expanded" class="pl-8 pt-1 space-y-1">
        <RouterLink
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
          :to="child.to"
          :class="[
            'block p-2 rounded text-sm transition-colors',
            'hover:bg-indigo-700 hover:text-white',
          ]"
          active-class="bg-indigo-700 text-white font-semibold"
        >
          {{ child.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
