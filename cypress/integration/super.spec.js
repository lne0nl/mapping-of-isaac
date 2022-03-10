/// <reference types="cypress" />
describe('Super secret rooms logic', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check super secret rooms logic', () => {
    cy.get('#54').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#42').click();
    cy.get('[data-cy="boss"]').click();
    cy.get('#53').find('img').should('exist');
    cy.get('#55').find('img').should('exist');
  });
});