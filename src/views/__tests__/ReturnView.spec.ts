import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ReturnView from '@/views/ReturnView.vue'

describe('ReturnView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the form title', () => {
    const wrapper = mount(ReturnView)
    expect(wrapper.text()).toContain('Returns')
  })

  it('adds a row when "Add Another Item" is clicked', async () => {
    const wrapper = mount(ReturnView)
    expect(wrapper.findAll('button[title="Remove Item"]')).toHaveLength(1)
    const addButton = wrapper.find('button.text-indigo-600')
    await addButton.trigger('click')
    expect(wrapper.findAll('button[title="Remove Item"]')).toHaveLength(2)
  })

  it('updates the model when input changes', async () => {
    const wrapper = mount(ReturnView)
    const dealerInput = wrapper.find('input[placeholder="Enter dealer name"]')
    await dealerInput.setValue('Test Dealer Ltd')
    expect((dealerInput.element as HTMLInputElement).value).toBe('Test Dealer Ltd')
  })
})
