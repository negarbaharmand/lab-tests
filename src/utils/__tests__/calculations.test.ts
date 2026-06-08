import { describe, it, expect } from 'vitest'
import { calculateTotal, calculateTotalByType, calculateByCategory } from '../calculations'
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
]

describe('calculateTotal', () => {
  it('returns the correct balance (income minus expenses)', () => {
    expect(calculateTotal(testTransactions)).toBe(15500)
  })

  it('returns 0 for an empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('handles income-only transactions', () => {
    const incomeOnly = testTransactions.filter((t) => t.type === 'income')
    expect(calculateTotal(incomeOnly)).toBe(25000)
  })

  it('handles expense-only transactions', () => {
    const expenseOnly = testTransactions.filter((t) => t.type === 'expense')
    expect(calculateTotal(expenseOnly)).toBe(-9500)
  })
})

describe('calculateTotalByType', () => {
  it('sums correctly for income', () => {
    expect(calculateTotalByType(testTransactions, 'income')).toBe(25000)
  })

  it('sums correctly for expense', () => {
    expect(calculateTotalByType(testTransactions, 'expense')).toBe(9500)
  })

  it('returns 0 if no transactions match the type', () => {
    const incomeOnly = testTransactions.filter((t) => t.type === 'income')
    expect(calculateTotalByType(incomeOnly, 'expense')).toBe(0)
  })
})

describe('calculateByCategory', () => {
  it('returns correct sums per category', () => {
    const result = calculateByCategory(testTransactions)
    expect(result.housing).toBe(8000)
    expect(result.food).toBe(1500)
  })

  it('only counts expenses, not income', () => {
    const result = calculateByCategory(testTransactions)
    expect(result.salary).toBe(0)
  })

  it('returns 0 for categories with no transactions', () => {
    const result = calculateByCategory(testTransactions)
    expect(result.transport).toBe(0)
    expect(result.entertainment).toBe(0)
    expect(result.other).toBe(0)
  })
})
