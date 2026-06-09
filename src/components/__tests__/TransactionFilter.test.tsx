import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransactionFilter } from '../TransactionFilter'

describe('TransactionFilter', () => {
  it('calls onFilterChange with the correct searchTerm when typing in the search field', async () => {
    const mockFilterChange = vi.fn()
    render(<TransactionFilter filters={{}} onFilterChange={mockFilterChange} />)


    await userEvent.type(screen.getByLabelText('Sök'), 'r')
    expect(mockFilterChange).toHaveBeenCalledWith({ searchTerm: 'r' })
  })

  it('calls onFilterChange with the correct type when selecting from the type dropdown', async () => {
    const mockFilterChange = vi.fn()
    render(<TransactionFilter filters={{}} onFilterChange={mockFilterChange} />)

    await userEvent.selectOptions(screen.getByLabelText('Typ'), 'income')
    expect(mockFilterChange).toHaveBeenCalledWith({ type: 'income' })
  })

  it('calls onFilterChange with the correct category when selecting from the category dropdown', async () => {
    const mockFilterChange = vi.fn()
    render(<TransactionFilter filters={{}} onFilterChange={mockFilterChange} />)

    await userEvent.selectOptions(screen.getByLabelText('Kategori'), 'food')
    expect(mockFilterChange).toHaveBeenCalledWith({ category: 'food' })
  })
})
