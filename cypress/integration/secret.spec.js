/// <reference types="cypress" />
describe('Secret rooms logic', () => {
  beforeEach(() => {
    cy.visit('/');
  });
 
  it('Check secret rooms logic', () => {
    cy.get('#78').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#79').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#67').find('img').should('exist');
  });

  it('Check obstacles', () => {
    cy.get('#78').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#79').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#79').click();
    cy.get('[data-obstacle="top"]').click();
    cy.get('#67').find('img').should('not.exist');
  });

  it('Check boss room', () => {
    cy.get('#78').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#79').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#79').click();
    cy.get('[data-cy="boss"]').click();
    cy.get('#67').find('img').should('not.exist');
  });

  it('Exclude corridor for calculate secret room position', () => {
    cy.get('#77').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#67').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#78').click();
    cy.get('[data-cy="corridor_v"]').click();
    cy.get('#77').find('img').should('exist');
    cy.get('#79').find('img').should('not.exist');
  });

  it('Set priority to 3 rooms over 2 rooms', () => {
    cy.get('#77').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#79').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#65').find('img').should('not.exist');
    cy.get('#67').find('img').should('not.exist');
    cy.get('#78').find('img').should('exist');
  });
});
