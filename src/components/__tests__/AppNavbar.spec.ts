import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import router from '../../router/index'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import AppNavbar from '../AppNavbar.vue'

// Setup router
const testRouter = createRouter({
  history: createMemoryHistory(),
  routes: router.options.routes,
})

describe('AppNavbar.vue', () => {
  // 1. Render the navigation items
  it('renders the correct navigation items', () => {
    const wrapper = mount(AppNavbar, {
      global: {
        plugins: [testRouter, createPinia()],
      },
    })

    expect(wrapper.text()).toContain('Stock')
    expect(wrapper.text()).toContain('Transactions')
    expect(wrapper.text()).toContain('Reports')
  })

  // // 2. When clicked a parent item, child items must be visible
  // it('shows child items when a parent item is clicked', async () => {
  //   const wrapper = mount(AppNavbar, {
  //     global: {
  //       plugins: [testRouter, createPinia()],
  //     },
  //   })

  //   // Test Transactions
  //   const transactionsBtn = wrapper.findAll('button').find((b) => b.text().includes('Transactions'))
  //   const saleLink = wrapper.findAll('a').find((a) => a.text().includes('Sale'))
  //   const returnLink = wrapper.findAll('a').find((a) => a.text().includes('Return'))

  //   expect(saleLink?.isVisible()).toBe(false)
  //   expect(returnLink?.isVisible()).toBe(false)

  //   await transactionsBtn?.trigger('click')

  //   expect(saleLink?.isVisible()).toBe(true)
  //   expect(returnLink?.isVisible()).toBe(true)

  //   // Test Reports
  //   const reportsBtn = wrapper.findAll('button').find((b) => b.text().includes('Reports'))
  //   const stockReportLink = wrapper.findAll('a').find((a) => a.text().includes('Stock Report'))
  //   const binReportLink = wrapper.findAll('a').find((a) => a.text().includes('Bin Report'))
  //   const dailyReportLink = wrapper.findAll('a').find((a) => a.text().includes('Daily Report'))

  //   expect(stockReportLink?.isVisible()).toBe(false)
  //   expect(binReportLink?.isVisible()).toBe(false)
  //   expect(dailyReportLink?.isVisible()).toBe(false)
  //   await reportsBtn?.trigger('click')

  //   expect(stockReportLink?.isVisible()).toBe(true)
  //   expect(binReportLink?.isVisible()).toBe(true)
  //   expect(dailyReportLink?.isVisible()).toBe(true)
  // })
  // // 3. When clicked a child item, the router should change accordingly
  // it('navigates to the correct route when a child item is clicked', async () => {
  //   const wrapper = mount(AppNavbar, {
  //     global: {
  //       plugins: [testRouter, createPinia()],
  //     },
  //   })

  //   // Test Transactions -> Sale
  //   const transactionsBtn = wrapper.findAll('button').find((b) => b.text().includes('Transactions'))
  //   await transactionsBtn?.trigger('click')

  //   const saleLink = wrapper.findAll('a').find((a) => a.text().includes('Sale'))
  //   await saleLink?.trigger('click')
  //   // Verify after clicking Sale
  //   expect(testRouter.currentRoute.value.path).toBe('/transactions/sale')

  //   const returnLink = wrapper.findAll('a').find((a) => a.text().includes('Return'))
  //   await returnLink?.trigger('click')
  //   // Verify after clicking Return
  //   expect(testRouter.currentRoute.value.path).toBe('/transactions/return')

  //   // Test Reports -> Stock Report
  //   const reportsBtn = wrapper.findAll('button').find((b) => b.text().includes('Reports'))
  //   await reportsBtn?.trigger('click')

  //   const stockReportLink = wrapper.findAll('a').find((a) => a.text().includes('Stock Report'))
  //   await stockReportLink?.trigger('click')
  //   expect(testRouter.currentRoute.value.path).toBe('/reports/stock')

  //   const binReportLink = wrapper.findAll('a').find((a) => a.text().includes('Bin Report'))
  //   await binReportLink?.trigger('click')
  //   expect(testRouter.currentRoute.value.path).toBe('/reports/bin')

  //   const dailyReportLink = wrapper.findAll('a').find((a) => a.text().includes('Daily Report'))
  //   await dailyReportLink?.trigger('click')
  //   expect(testRouter.currentRoute.value.path).toBe('/reports/daily')
  // })
})
