/// <reference types="cypress" />
describe('Rooms Management', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#65').as('room-test');
  });
 
  it('Open room types modal', () => {
    cy.get('@room-test').click();
    cy.get('.types');
  });

  it('Check if we can change room type', () => {
    cy.get('@room-test').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('@room-test').find('img').should('exist');
  });

  it('Empty map', () => {
    cy.get('@room-test').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('.actions > :nth-child(1)').click();
    cy.get('@room-test').find('img').should('not.exist');
  });
});
