/**
 * E2E Scenario: Login
 *
 * ~ Login Spec
 *   - should display login page correctly
 *   - should prevent login when email and password are empty
 *   - should prevent login when email format is invalid
 *   - should display toast when email or password is wrong
 *   - should display toast and redirect to home on successful login
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.url().should('include', '/login');
  });

  it('should display login page correctly', () => {
    cy.get('[data-cy="login-email"]').should('be.visible');
    cy.get('[data-cy="login-password"]').should('be.visible');
    cy.get('[data-cy="login-button"]').should('be.visible');
  });

  it('should prevent login when email and password are empty', () => {
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
  });

  it('should prevent login when invalid email format', () => {
    cy.get('[data-cy="login-email"]').type('invalidemail');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
  });

  it('should display toast when login email and password are wrong', () => {
    cy.get('[data-cy="login-email"]').type('salah@contoh.com');
    cy.get('[data-cy="login-password"]').type('salahpassword');
    cy.get('[data-cy="login-button"]').click();

    cy.contains(/email|password is wrong/i, { timeout: 10000 }).should('be.visible');
  });

  it('should display toast and redirect to home page when success login', () => {
    cy.get('[data-cy="login-email"]').type('user@user.com');
    cy.get('[data-cy="login-password"]').type('user@user.com');
    cy.get('[data-cy="login-button"]').click();

    cy.contains(/login success/i, { timeout: 10000 }).should('be.visible');
    cy.url().should('eq', 'http://localhost:5173/');
  });
});
