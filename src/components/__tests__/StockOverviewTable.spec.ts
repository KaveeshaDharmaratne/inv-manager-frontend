import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import StockOverviewTable from '../StockOverviewTable.vue'
import type { StockTransaction } from '@/types/stock'

describe('StockOverviewTable', () => {
  const mockTransactions: StockTransaction[] = [
    {
      id: '1',
      date: '2023-01-01',
      type: 'Invoice',
      transactionId: 'INV-001',
      dealer: 'Dealer A',
    },
    {
      id: '2',
      date: '2023-01-05',
      type: 'Return Stock',
      transactionId: 'RET-001',
      dealer: 'Dealer B',
    },
    {
      id: '3',
      date: '2023-01-03',
      type: 'Damage Stock',
      transactionId: 'DMG-001',
      dealer: 'Dealer A',
    },
  ]

  it('renders properly', () => {
    const wrapper = mount(StockOverviewTable, {
      props: { transactions: [] },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('DATE')
    expect(wrapper.text()).toContain('TRANSACTION TYPE')
    expect(wrapper.text()).toContain('TRANSACTION NO')
    expect(wrapper.text()).toContain('DEALER')
  })

  it('renders transactions in descending date order', () => {
    const wrapper = mount(StockOverviewTable, {
      props: { transactions: mockTransactions },
    })

    const rows = wrapper.findAll('tbody tr')
    // We expect 3 data rows. The "No transactions found" row should not be present.
    expect(rows.length).toBe(3)

    // First row should be the latest date (2023-01-05)
    expect(rows[0].text()).toContain('05/01/2023')
    expect(rows[0].text()).toContain('Return Stock')
    expect(rows[0].text()).toContain('RET-001')

    // Second row (2023-01-03)
    expect(rows[1].text()).toContain('03/01/2023')
    expect(rows[1].text()).toContain('Damage Stock')

    // Third row (2023-01-01)
    expect(rows[2].text()).toContain('01/01/2023')
    expect(rows[2].text()).toContain('Invoice')
  })

  it('displays "No transactions found" when list is empty', () => {
    const wrapper = mount(StockOverviewTable, {
      props: { transactions: [] },
    })

    expect(wrapper.text()).toContain('No transactions found')
  })
})
