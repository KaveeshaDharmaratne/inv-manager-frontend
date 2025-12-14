import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import AppNavbar from '../AppNavbar.vue'

// 1. Setup a mock router configuration
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: { template: '<div>Dashboard</div>' },
    },
    {
      path: '/stock/overview',
      name: 'stock-overview',
      component: { template: '<div>Stock Overview</div>' },
    },
    {
      path: '/transactions/sale',
      name: 'transactions-sale',
      component: { template: '<div>Sale</div>' },
    },
  ],
})

describe('AppNavbar.vue', () => {
  // Reset router before each test
  beforeEach(async () => {
    await router.push('/')
    await router.isReady()
  })

  it('renders the correct navigation items', () => {
    const wrapper = mount(AppNavbar, {
      global: {
        plugins: [router], // Install the router plugin
      },
    })

    // Check for main labels
    expect(wrapper.text()).toContain('Stock')
    expect(wrapper.text()).toContain('Transactions')
    expect(wrapper.text()).toContain('Reports')
  })

  it('applies active class to the active item based on route', async () => {
    // Navigate to a route that should make "Stock" active
    await router.push('/stock/overview')
    await router.isReady()

    const wrapper = mount(AppNavbar, {
      global: {
        plugins: [router],
      },
    })

    // Find the button for "Stock"
    // Note: If your component logic highlights the parent based on the child route,
    // this assertion will pass.
    const stockBtn = wrapper.findAll('button').find((b) => b.text().includes('Stock'))

    expect(stockBtn).toBeDefined()
    // Verify active classes (adjust 'bg-primary' to match your actual active-class prop or logic)
    expect(stockBtn?.classes()).toContain('bg-primary')
    expect(stockBtn?.classes()).toContain('text-white')
  })

  it('shows sub-items for expanded items', async () => {
    // Navigate to ensure state is consistent
    await router.push('/stock/overview')

    const wrapper = mount(AppNavbar, {
      global: {
        plugins: [router],
      },
    })

    // "Stock" is expanded by default in your component logic
    expect(wrapper.text()).toContain('Stock Overview')
    expect(wrapper.text()).toContain('Damage')

    // Verify "Stock Overview" link is active because we are on that route
    // RouterLink renders as 'a' tag by default
    const stockOverviewLink = wrapper.findAll('a').find((a) => a.text().includes('Stock Overview'))

    // RouterLink automatically adds 'router-link-active' or your custom 'active-class'
    // Checking for the classes defined in your component
    expect(stockOverviewLink?.classes()).toContain('text-primary')
    expect(stockOverviewLink?.classes()).toContain('bg-zinc-200')
  })

  it('toggles sub-menu expansion when clicked', async () => {
    const wrapper = mount(AppNavbar, {
      global: {
        plugins: [router],
      },
    })

    const transactionsBtn = wrapper.findAll('button').find((b) => b.text().includes('Transactions'))
    expect(transactionsBtn).toBeDefined()

    // Find the sub-menu link for 'Sale' which is under Transactions
    // We use findComponent or search for the text to find the container/link
    const saleLink = wrapper.findAll('a').find((a) => a.text().includes('Sale'))

    // Initial state: Should be hidden
    // isVisible() checks for display: none, visibility: hidden, or opacity: 0
    expect(saleLink?.isVisible()).toBe(false)

    // Click to expand
    await transactionsBtn?.trigger('click')

    // Now should be visible
    expect(saleLink?.isVisible()).toBe(true)

    // Click to collapse
    await transactionsBtn?.trigger('click')

    // Click to collapse
    expect(saleLink?.isVisible()).toBe(false)
  })
})
