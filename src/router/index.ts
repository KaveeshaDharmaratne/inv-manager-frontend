import { createRouter, createWebHistory } from 'vue-router'

// In a real app, you would import actual components from ../views/
const Placeholder = { template: '<div>Page Content</div>' }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/stock/overview',
      name: 'stock-overview',
      component: Placeholder,
    },
    {
      path: '/stock/damage',
      name: 'stock-damage',
      component: Placeholder,
    },
    {
      path: '/transactions/sale',
      name: 'transactions-sale',
      component: Placeholder,
    },
    {
      path: '/transactions/return',
      name: 'transactions-return',
      component: Placeholder,
    },
    {
      path: '/reports/stock',
      name: 'reports-stock',
      component: Placeholder,
    },
    {
      path: '/reports/bin',
      name: 'reports-bin',
      component: () => import('../views/BinCardLedgerView.vue'),
    },
    {
      path: '/reports/daily',
      name: 'reports-daily',
      component: Placeholder,
    },
  ],
})

export default router
