import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ledger',
      name: 'ledger',
      component: () => import('../views/BinCardLedgerView.vue'),
    },
    {
      path: '/return',
      name: 'return',
      component: () => import('../views/ReturnView.vue'),
    },
  ],
})

export default router
