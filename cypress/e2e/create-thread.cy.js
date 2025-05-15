/**
 * E2E Scenario: Create Thread
 *
 * ~ Create Thread Spec
 *   - should redirect to login if user is not authenticated
 *   - should display create thread form correctly
 *   - should prevent submit when fields are empty
 *   - should successfully create a thread and redirect to home with toast
 */

import { faker } from '@faker-js/faker';

describe('Create Thread Spec', () => {
  const login = () => {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy="login-email"]').type('user@user.com');
    cy.get('[data-cy="login-password"]').type('user@user.com');
    cy.get('[data-cy="login-button"]').click();

    cy.contains(/login success/i, { timeout: 10000 }).should('be.visible');

    cy.url().should('eq', 'http://localhost:5173/');
  };


  it('should redirect to login if user is not authenticated', () => {
    cy.visit('http://localhost:5173/add');
    cy.url().should('include', '/login');
  });

  it('should display create thread form correctly', () => {
    login();

    cy.visit('http://localhost:5173/add');
    cy.url().should('include', '/add');

    cy.get('[data-cy="create-title"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy="create-category"]').should('be.visible');
    cy.get('[data-cy="create-content"]').should('be.visible');
  });


  it('should prevent submit when fields are empty', () => {
    login();
    cy.visit('http://localhost:5173/add');
    cy.url().should('include', '/add');

    cy.get('[data-cy="create-submit"]').click();

    cy.contains(/all fields are required/i).should('be.visible');
    cy.url().should('include', '/add');
  });

  it('should successfully create a thread and show toast', () => {
    login();
    cy.visit('http://localhost:5173/add');
    cy.url().should('include', '/add');

    const title = faker.lorem.words(3);
    const category = faker.lorem.word();
    const content = faker.lorem.paragraph();

    cy.get('[data-cy="create-title"]').type(title);
    cy.get('[data-cy="create-category"]').type(category);
    cy.get('[data-cy="create-content"]').type(content);
    cy.get('[data-cy="create-submit"]').click();

    cy.contains(/thread created successfully/i, { timeout: 10000 }).should('be.visible');
  });
});
