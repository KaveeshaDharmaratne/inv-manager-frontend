import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../Navbar.vue'

describe('Navbar.vue', () => {
  it('renders the correct navigation items', () => {
    const wrapper = mount(Navbar)

    // Check for main labels
    expect(wrapper.text()).toContain('Stock')
    expect(wrapper.text()).toContain('Transactions')
    expect(wrapper.text()).toContain('Reports')
  })

  it('applies active class to the active item', () => {
    const wrapper = mount(Navbar)

    // Find the button for "Stock" (which is active in the mock data)
    const stockBtn = wrapper.findAll('button').find(b => b.text().includes('Stock'))
    
    expect(stockBtn).toBeDefined()
    // Verify active classes
    expect(stockBtn?.classes()).toContain('bg-primary')
    expect(stockBtn?.classes()).toContain('text-white')
  })

  it('applies inactive class to inactive items', () => {
    const wrapper = mount(Navbar)

    // Find the button for "Transactions" (which is inactive)
    const transactionsBtn = wrapper.findAll('button').find(b => b.text().includes('Transactions'))
    
    expect(transactionsBtn).toBeDefined()
    // Verify inactive classes
    expect(transactionsBtn?.classes()).toContain('text-zinc-600')
    expect(transactionsBtn?.classes()).not.toContain('bg-primary')
  })

  it('shows sub-items for expanded items', () => {
    const wrapper = mount(Navbar)

    // "Stock" is expanded by default in the mock data
    expect(wrapper.text()).toContain('Stock Overview')
    expect(wrapper.text()).toContain('Damage')
    
    // Verify "Stock Overview" is active
    const stockOverviewLink = wrapper.findAll('a').find(a => a.text().includes('Stock Overview'))
    expect(stockOverviewLink?.classes()).toContain('text-primary')
    expect(stockOverviewLink?.classes()).toContain('bg-zinc-200')
  })

  it('toggles sub-menu expansion when clicked', async () => {
    const wrapper = mount(Navbar)

    const transactionsBtn = wrapper.findAll('button').find(b => b.text().includes('Transactions'))
    expect(transactionsBtn).toBeDefined()

    // Find the sub-menu container for Transactions
    // Based on the order in navItems, Transactions is at index 1
    // The sub-menus have class 'pl-8'
    const subMenus = wrapper.findAll('.pl-8')
    const transactionsSubMenu = subMenus[1] // Index 1 corresponds to Transactions

    // Initial state: hidden (v-show adds display: none)
    expect(transactionsSubMenu.attributes('style')).toContain('display: none')

    // Click to expand
    await transactionsBtn?.trigger('click')

    // Now should be visible (style attribute should be empty or not contain display: none)
    // Note: Vue removes display: none when v-show is true
    expect(transactionsSubMenu.attributes('style') || '').not.toContain('display: none')
    
    // Click to collapse
    await transactionsBtn?.trigger('click')
    expect(transactionsSubMenu.attributes('style')).toContain('display: none')
  })
})


