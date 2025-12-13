import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NavItem } from '@/types/navItem';

export const useNavigationStore = defineStore('navigation', () => {
  const navItems = ref<NavItem[]>([
    {
      label: 'Stock',
      icon: 'inventory',
      expanded: true,
      children: [
        { label: 'Stock Overview', to: '/stock/overview'},
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
      ],
    },
    {
      label: 'Reports',
      icon: 'assessment',
      expanded: false,
      children: [
        { label: 'Stock Report', to: '/reports/stock' },
        { label: 'Bin Report', to: '/reports/bin' },
        { label: 'Daily Stock', to: '/reports/daily' },
      ],
    },
  ]);

  const toggleExpand = (item: NavItem) => {
    item.expanded = !item.expanded;
  };

  return { navItems, toggleExpand };
});