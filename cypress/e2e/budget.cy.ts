/*
 * Difference between this E2E test and the RTL tests:
 *
 * RTL tests run in a fake DOM (jsdom) inside Node.js — no real browser, no real network.
 * They are fast (milliseconds) and test components in isolation or together in memory.
 *
 * This Cypress test runs in a real Chrome browser against the actual running app.
 * It tests the full user flow end-to-end: the dev server must be running, the real DOM
 * is rendered, and interactions happen exactly as a real user would experience them.
 * This means it can catch issues RTL never would — CSS hiding a button, routing bugs,
 * browser-specific behaviour. The trade-off is that it is much slower (seconds per test).
 */

describe('Budget app', () => {
  it('adds a transaction and verifies the balance updates', () => {
    // 1. Open the app
    cy.visit('/')

    // 2. Verify the initial balance before adding anything
    cy.get('.balance-total').should('contain', '16401.00 kr')

    // 3. Fill in the form
    cy.get('#description').type('Lunch')
    cy.get('#amount').type('500')
    // type is already 'expense' by default

    // 4. Submit
    cy.contains('button', 'Lägg till').click()

    // 5. Verify the new transaction appears in the list
    cy.get('.transaction-list').contains('Lunch').should('exist')

    // 6. Verify the balance has decreased by 500
    cy.get('.balance-total').should('contain', '15901.00 kr')
  })
})