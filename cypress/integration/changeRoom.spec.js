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
    cy.get('[data-type="treasure"]').click();
    cy.get('@room-test').find('img').should('have.attr', 'src');
  });
  it('Check secret rooms logic', () => {
    cy.get('#78').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('#79').click();
    cy.get('[data-cy="empty"]').click();
    cy.get('.actions > :nth-child(2)').click();
    cy.get('#67').find('img').should('have.attr', 'src');
  });
});
