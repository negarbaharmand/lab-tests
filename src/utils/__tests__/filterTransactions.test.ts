import { describe, it, expect } from 'vitest'
import { filterTransactions } from '../filterTransactions'
import type { Transaction } from '../../types'

const testTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary',
    amount: 25000,
    type: 'income',
    category: 'salary',
    date: '2025-04-01',
  },
  {
    id: '2',
    description: 'Rent',
    amount: 8000,
    type: 'expense',
    category: 'housing',
    date: '2025-04-01',
  },
  {
    id: '3',
    description: 'Groceries',
    amount: 1500,
    type: 'expense',
    category: 'food',
    date: '2025-04-02',
  },
  {
    id: '4',
    description: 'Bus ticket',
    amount: 50,
    type: 'expense',
    category: 'transport',
    date: '2025-04-03',
  },
]

describe('filterTransactions', () => {
  it('returns all transactions when no filters are set', () => {
    expect(filterTransactions(testTransactions, {})).toHaveLength(4)
  })

  it('filters by type: income', () => {
    const result = filterTransactions(testTransactions, { type: 'income' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('filters by type: expense', () => {
    const result = filterTransactions(testTransactions, { type: 'expense' })
    expect(result).toHaveLength(3)
    result.forEach((t) => expect(t.type).toBe('expense'))
  })

  it('filters by category', () => {
    const result = filterTransactions(testTransactions, { category: 'food' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })

  it('filters by searchTerm (case-insensitive)', () => {
    expect(filterTransactions(testTransactions, { searchTerm: 'rent' })).toHaveLength(1)
    expect(filterTransactions(testTransactions, { searchTerm: 'RENT' })).toHaveLength(1)
    expect(filterTransactions(testTransactions, { searchTerm: 'ReNt' })).toHaveLength(1)
  })

  it('combines multiple filters at once', () => {
    const result = filterTransactions(testTransactions, {
      type: 'expense',
      category: 'housing',
      searchTerm: 'rent',
    })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('returns an empty array if nothing matches', () => {
    expect(filterTransactions(testTransactions, { searchTerm: 'xyz' })).toHaveLength(0)
    expect(filterTransactions(testTransactions, { category: 'entertainment' })).toHaveLength(0)
  })
})
