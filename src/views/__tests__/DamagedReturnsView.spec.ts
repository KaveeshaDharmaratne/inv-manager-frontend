import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DamagedReturnsView from '@/views/DamagedReturnsView.vue'
import { useDamageStore } from '@/stores/damage'

describe('DamagedReturnsView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the page title correctly', () => {
    const wrapper = mount(DamagedReturnsView)
    expect(wrapper.text()).toContain('Damaged Returns')
  })

  it('displays loading state initially', async () => {
    const wrapper = mount(DamagedReturnsView)
    const store = useDamageStore()

    // Manually set loading to true to verify UI
    store.isLoading = true
    await wrapper.vm.$nextTick() // Wait for DOM update

    expect(wrapper.text()).toContain('Loading data...')
  })

  it('renders table rows based on store data', async () => {
    const wrapper = mount(DamagedReturnsView)
    const store = useDamageStore()

    // Arrange: Seed the store with data
    store.items = [
      { id: '1', date: '2023-10-27', type: 'Damage', dealer: 'Test Dealer', returnNoteNo: 'RN-999', code: 'CODE-1', description: 'Broken', qty: 5 }
    ]

    // Wait for Vue to re-render
    await wrapper.vm.$nextTick()

    // Assert: Check if "Test Dealer" is visible
    expect(wrapper.text()).toContain('Test Dealer')
    expect(wrapper.text()).toContain('RN-999')
  })

  it('updates search query in store when input changes', async () => {
    const wrapper = mount(DamagedReturnsView)
    const store = useDamageStore()

    // Find the search input
    const input = wrapper.find('input[placeholder*="Find by Note No"]')

    // Act: Simulate typing
    await input.setValue('RN-2023')

    // Assert: Store state should be updated
    expect(store.searchQuery).toBe('RN-2023')
  })
})
