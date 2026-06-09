# Frontend Testing — Budget Planner

This repository is a lab assignment focused on writing automated tests for a React application called the **Budget Planner**. The app lets users add income and expenses, view their balance, and filter transactions. The application code was provided — the task was to write the tests.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) — test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — component testing
- [Cypress](https://docs.cypress.io/) — end-to-end testing

## Running the app

```bash
npm install
npm run dev
```

## Running the tests

```bash
# Run all Vitest tests once
npm run test:run

# Run in watch mode
npm test

# Open Cypress (requires dev server to be running)
npx cypress open
```

---

## What I tested

### Part 1 — Unit tests

Pure utility functions with no React dependencies.

| File | Tests |
|---|---|
| `src/utils/__tests__/formatCurrency.test.ts` | Integers, decimals, zero, negative numbers |
| `src/utils/__tests__/calculations.test.ts` | `calculateTotal`, `calculateTotalByType`, `calculateByCategory` |
| `src/utils/__tests__/filterTransactions.test.ts` | Filter by type, category, search term, combined filters |

### Part 2 — Component tests (React Testing Library)

React components rendered in a fake DOM (jsdom), interactions simulated with `userEvent`.

| File | Tests |
|---|---|
| `src/components/__tests__/Balance.test.tsx` | Correct balance, income, expenses, empty state |
| `src/components/__tests__/TransactionList.test.tsx` | Empty state, renders all items, delete callback |
| `src/components/__tests__/TransactionForm.test.tsx` | Field rendering, validation errors, submit, form reset |
| `src/components/__tests__/TransactionFilter.test.tsx` | Search, type filter, category filter |
| `src/__tests__/App.test.tsx` | Full integration: add, delete, filter transactions |

### Part 3 — End-to-end test (Cypress)

`cypress/e2e/budget.cy.ts` — runs in a real Chrome browser against the live dev server:

1. Opens the app
2. Adds a new transaction via the form
3. Verifies the transaction appears in the list
4. Verifies the balance has updated correctly

---

## Key concepts

### Why write tests?

Automated tests catch bugs before they reach production. When constantly making changes to code, tests immediately tell you if something breaks. Tests also act as documentation — they show exactly how a function or component is supposed to behave.

### When to test, and when not to?

Tests are most valuable for business logic, calculations, and critical user flows — things that must work correctly and will be touched again. They are less worthwhile for quick prototypes where the code changes constantly, for pure visual layout, or for integrations with external APIs outside your control.

### Unit vs integration vs E2E

| | Unit | Integration | E2E |
|---|---|---|---|
| Tests | One function/component | Multiple parts together | The entire app |
| Environment | Simulated (jsdom) | Simulated (jsdom) | Real browser |
| Speed | Milliseconds | Milliseconds | Seconds |
| Example | `formatCurrency(100)` returns `"100.00 kr"` | Form validates input and calls callback | User adds transaction and sees balance update |

### Test-Driven Development (TDD)

TDD is a method where you write the test before you write the code. Instead of building something and then checking if it works, you first define what "working" means, then build it to pass that definition.

**Write the test → Watch it fail → Make it pass → Clean it up → Repeat.**
