/**
 * E2E Scenario: Leaderboard
 *
 * ~ Leaderboard Spec
 *   - should display leaderboard page correctly with table, Name, and Score columns
 */

describe('leaderboard spec', () => {
  it('should display leaderboard page correctly', () => {
    cy.visit('http://localhost:5173/leaderboard');

    cy.get('table').should('be.visible');
    cy.get('th').contains(/^Name$/).should('be.visible');
    cy.get('th').contains(/^Score$/).should('be.visible');
  });
});
