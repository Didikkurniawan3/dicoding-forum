/**
 * E2E Scenario: Register
 *
 * ~ Register Spec
 *   - should display register page correctly
 *   - should prevent register with empty fields
 *   - should prevent register with invalid email format
 *   - should register successfully and redirect to login
 */

import { faker } from '@faker-js/faker';

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
    cy.url().should('include', '/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Register').should('be.visible');
  });

  it('should prevent register with empty fields', () => {
    cy.get('button').contains('Register').click();
    cy.url().should('include', '/register');
  });

  it('should prevent register with invalid email format', () => {
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('invalidemail');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button').contains('Register').click();

    cy.url().should('include', '/register');
  });

  it('should register successfully and redirect to login', () => {
    const fakeName = faker.person.fullName();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    cy.get('input[placeholder="Name"]').type(fakeName);
    cy.get('input[placeholder="Email"]').type(fakeEmail);
    cy.get('input[placeholder="Password"]').type(fakePassword);

    cy.get('button').contains('Register').click();

    cy.url().should('include', '/login');
  });
});
