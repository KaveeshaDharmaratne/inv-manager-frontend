<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import type { NavItem } from '@/types/navigation'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const emit = defineEmits<(e: 'navigate') => void>()

const navItems = ref<NavItem[]>([
  {
    label: 'Stock',
    icon: 'inventory',
    expanded: true,
    children: [
      { label: 'Stock Overview', to: '/stock/overview' },
      { label: 'Damage', to: '/stock/damage' },
    ],
  },
  {
    label: 'Transactions',
    icon: 'receipt_long',
    expanded: false,
    children: [
      { label: 'Sale', to: '/transactions/sale' },
      { label: 'Return', to: '/transactions/return' },
      { label: 'GDN', to: '/transactions/gdn' },
    ],
  },
  {
    label: 'Reports',
    icon: 'assessment',
    expanded: false,
    children: [
      // { label: 'Stock Report', to: '/reports/stock' },
      { label: 'Bin Report', to: '/reports/bin' },
      { label: 'Daily Stock', to: '/reports/daily' },
    ],
  },
  {
    label: 'Settings',
    icon: 'settings',
    expanded: false,
    children: [
      { label: 'Data Management', to: '/settings/data-management' },
    ],
  },
])

const toggleExpand = (item: NavItem) => {
  item.expanded = !item.expanded
}

const handleNavigate = () => {
  emit('navigate')
}

const handleLogout = async () => {
  try {
    await authStore.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Sign out failed:', error)
  }
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
  <div class="flex-1 flex flex-col justify-between p-4 min-h-0">
    <nav class="space-y-1 overflow-y-auto">
      <div v-for="(item, index) in navItems" :key="index">
        <button @click="toggleExpand(item)" :aria-expanded="item.expanded ? 'true' : 'false'" :class="[
          'w-full flex items-center justify-between p-2 rounded font-medium transition-colors cursor-pointer',
          'text-zinc-600 dark:text-zinc-400',
          item.children.some((child) => child.to === route.path)
            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
            : '',
          'hover:bg-indigo-700 hover:text-white',
        ]">
          <span class="flex items-center gap-3">
            <span class="material-icons-outlined text-xl">{{ item.icon }}</span>
            {{ item.label }}
          </span>
          <span class="material-icons-outlined text-lg">
            {{ item.expanded ? 'expand_less' : 'expand_more' }}
          </span>
        </button>
        <div v-show="item.expanded" class="pl-8 pt-1 space-y-1">
          <RouterLink v-for="(child, childIndex) in item.children" :key="childIndex" :to="child.to"
            @click="handleNavigate" :class="[
              'block p-2 rounded text-sm transition-colors',
              'hover:bg-indigo-700 hover:text-white',
            ]" active-class="bg-indigo-700 text-white font-semibold">
            {{ child.label }}
          </RouterLink>
        </div>
      </div>
    </nav>
    <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0">
      <button @click="handleLogout"
        class="w-full flex items-center gap-3 p-2 rounded font-medium transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 dark:text-red-400 cursor-pointer">
        <span class="material-icons-outlined text-xl">logout</span>
        Logout
      </button>
    </div>
  </div>
</template>
