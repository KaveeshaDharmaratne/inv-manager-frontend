import { createRouter, createWebHistory } from 'vue-router'

// In a real app, you would import actual components from ../views/
const Placeholder = { template: '<div>Page Content</div>' }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/stock/overview',
      name: 'stock-overview',
      component: () => import('../views/StockOverviewView.vue'),
    },
    {
      path: '/stock/damage',
      name: 'stock-damage',
      component: () => import('../views/DamagedReturnsView.vue'),
    },
    {
      path: '/transactions/sale',
      name: 'transactions-sale',
      component: () => import('../views/SaleView.vue'),
    },
    {
      path: '/transactions/return',
      name: 'transactions-return',
      component: () => import('../views/ReturnView.vue'),
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
