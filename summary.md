## 1. Why write tests?

Automated tests catch bugs before they reach production. When we are constanly making changes on the code, tests immediately tell if something breaks. Tests also work as documentation: they show exactly how a function or component is supposed to behave.

## 2. When is it good to write tests, and when is it not?

Tests are most valuable for business logic, calculations, and critical user flows, things that must work correctly and are likely to be touched again in the future. It is less worthwhile to write tests for quick prototypes where the code changes constantly, for pure visual layout and styling, or for integrations with external APIs that are outside our control.

## 3. What is the difference between unit, integration, and E2E tests?

A unit test tests a single functionality or component in complete isolation. For example, testing that formatCurrency(100) returns "100.00 kr". A integration test tests that several parts work correctly together. For example, rendering a form component and verifying it validates input, updates state, and calls a callback. An E2E test (end-to-end) runs the entire application in a real browser and simulates a real user, for example, opening the app, filling in a form, and checking that the page updates. Unit tests are the fastest and cheapest, E2E tests are the slowest and most expensive, but they catch problems the others cannot.

## 4. What is Test-Driven Development (TDD)?

TDD is a method where you write the test before you write the code. Instead of building something and then checking if it works, you first define what "working" means, and then build it to pass that definition.

Write the test → Watch it fail → Make it pass → Clean it up → Repeat.
