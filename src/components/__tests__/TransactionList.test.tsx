import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransactionList } from '../TransactionList'
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
]

describe('TransactionList', () => {
  it('shows empty message when the list is empty', () => {
    render(<TransactionList transactions={[]} onDeleteTransaction={vi.fn()} />)
    expect(screen.getByText('Inga transaktioner att visa')).toBeInTheDocument()
  })

  it('renders all transactions', () => {
    render(<TransactionList transactions={testTransactions} onDeleteTransaction={vi.fn()} />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
  })

  it('shows description, amount, and category for each transaction', () => {
    render(<TransactionList transactions={testTransactions} onDeleteTransaction={vi.fn()} />)
    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.getByText('+25000.00 kr')).toBeInTheDocument()
    expect(screen.getByText('Lön')).toBeInTheDocument()

    expect(screen.getByText('Rent')).toBeInTheDocument()
    expect(screen.getByText('-8000.00 kr')).toBeInTheDocument()
    expect(screen.getByText('Boende')).toBeInTheDocument()
  })

  it('calls onDeleteTransaction with the correct id when delete is clicked', async () => {
    const mockDelete = vi.fn()
    render(<TransactionList transactions={testTransactions} onDeleteTransaction={mockDelete} />)

    await userEvent.click(screen.getByRole('button', { name: 'Ta bort Rent' }))
    expect(mockDelete).toHaveBeenCalledWith('2')
    expect(mockDelete).toHaveBeenCalledTimes(1)
  })
})
