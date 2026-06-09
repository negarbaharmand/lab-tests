import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Balance } from '../Balance'
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

describe('Balance', () => {
  it('shows the correct balance', () => {
    render(<Balance transactions={testTransactions} />)
    // 25000 - 8000 - 1500 = 15500
    expect(screen.getByText('15500.00 kr')).toBeInTheDocument()
  })

  it('shows the total income', () => {
    render(<Balance transactions={testTransactions} />)
    expect(screen.getByText('25000.00 kr')).toBeInTheDocument()
  })

  it('shows the total expenses', () => {
    render(<Balance transactions={testTransactions} />)
    expect(screen.getByText('9500.00 kr')).toBeInTheDocument()
  })

  it('shows "0.00 kr" for all values when the transaction list is empty', () => {
    render(<Balance transactions={[]} />)
    const zeros = screen.getAllByText('0.00 kr')
    expect(zeros).toHaveLength(3)
  })
})
