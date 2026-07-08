import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      redirect: '/stock/overview',
    },
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
      path: '/transactions/gdn',
      name: 'transactions-gdn',
      component: () => import('../views/GdnView.vue'),
    },
    {
      path: '/transactions/view/:type/:id',
      name: 'transaction-view',
      component: () => import('../views/InvoiceView.vue'),
      props: true,
    },
    // {
    //   path: '/reports/stock',
    //   name: 'reports-stock',
    //   component: Placeholder,
    // },
    {
      path: '/reports/bin',
      name: 'reports-bin',
      component: () => import('../views/BinCardLedgerView.vue'),
    },
    {
      path: '/reports/daily',
      name: 'reports-daily',
      component: () => import('../views/DailyStockView.vue'),
    },
    {
      path: '/settings/data-management',
      name: 'settings-data-management',
      component: () => import('../views/DataManagementView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  // Wait for Firebase to finish its initial auth check
  await authStore.authReady

  const isAuthenticated = !!authStore.user
  const isLoginPage = to.name === 'login'

  if (!isAuthenticated && !isLoginPage) {
    return { name: 'login' }
  }
  if (isAuthenticated && isLoginPage) {
    return { path: '/stock/overview' }
  }
})

export default router
