<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  label: string
  icon: string
  active?: boolean
  expanded: boolean
  children: { label: string; href: string; active?: boolean }[]
}

const navItems = ref<NavItem[]>([
  {
    label: 'Stock',
    icon: 'inventory',
    active: true,
    expanded: true,
    children: [
      { label: 'Stock Overview', href: '#', active: true },
      { label: 'Damage', href: '#' },
    ],
  },
  {
    label: 'Transactions',
    icon: 'receipt_long',
    expanded: false,
    children: [
      { label: 'Sale', href: '#' },
      { label: 'Return', href: '#' },
    ],
  },
  {
    label: 'Reports',
    icon: 'assessment',
    expanded: false,
    children: [
      { label: 'Stock Report', href: '#' },
      { label: 'Bin Report', href: '#' },
      { label: 'Daily Stock', href: '#' },
    ],
  },
])

const toggleExpand = (item: NavItem) => {
  item.expanded = !item.expanded
}
</script>

<template>
  <nav class="flex-1 p-4 space-y-1">
    <div v-for="(item, index) in navItems" :key="index">
      <button
        @click="toggleExpand(item)"
        :class="[
          'w-full flex items-center justify-between p-2 rounded font-medium transition-colors',
          item.active
            ? 'bg-primary text-white'
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800',
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
        <a
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
          :href="child.href"
          :class="[
            'block p-2 rounded text-sm transition-colors',
            child.active
              ? 'bg-zinc-200 dark:bg-zinc-700 text-primary dark:text-white font-semibold'
              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
          ]"
        >
          {{ child.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
