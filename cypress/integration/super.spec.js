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

  it('Check if there\'s only one adjacent room to super secret', () => {
    cy.get('#54').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#65').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#52').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#52').click();
    cy.get('[data-obstacle="right"]').click();
    cy.get('#42').click();
    cy.get('[data-cy="boss"]').click();
    cy.get('#53').should('not.have.attr', 'data-type', 'super');
  });

  it('Check if the secret does not appear if the adjacent room has obstacle', () => {
    cy.get('#54').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#54').click();
    cy.get('[data-obstacle="right"]').click();
    cy.get('#42').click();
    cy.get('[data-cy="boss"]').click();
    cy.get('#55').should('not.have.attr', 'data-type', 'super');
  });
});
