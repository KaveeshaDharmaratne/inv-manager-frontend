import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useReturnStore } from '@/stores/returns'
import apiClient from '@/api/axios'

vi.mock('@/api/axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Return Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with an empty item list and Good return type', () => {
    const store = useReturnStore()
    expect(store.form.items.length).toBe(0)
    expect(store.form.type).toBe('Good')
  })

  it('adds an item only when the code exists in the item master', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { code: '12345', description: 'Item A' },
    })

    const store = useReturnStore()
    store.newItem.code = '12345'
    store.newItem.qty = 2

    const success = await store.addItem()

    expect(success).toBe(true)
    expect(store.form.items).toEqual([
      expect.objectContaining({
        code: '12345',
        description: 'Item A',
        qty: 2,
      }),
    ])
    expect(store.errorMessage).toBeNull()
  })

  it('rejects unknown item codes before adding them to the form', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(new Error('Not found'))

    const store = useReturnStore()
    store.newItem.code = '99999'
    store.newItem.qty = 1

    const success = await store.addItem()

    expect(success).toBe(false)
    expect(store.form.items).toHaveLength(0)
    expect(store.errorMessage).toContain('Item code 99999 does not exist')
  })
})
