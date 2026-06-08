import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../formatCurrency'

describe('formatCurrency', () => {
  it('formats an integer with two decimals', () => {
    expect(formatCurrency(100)).toBe('100.00 kr')
  })

  it('formats a decimal number correctly', () => {
    expect(formatCurrency(49.9)).toBe('49.90 kr')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('0.00 kr')
  })

  it('handles negative numbers', () => {
    expect(formatCurrency(-50)).toBe('-50.00 kr')
  })
})
