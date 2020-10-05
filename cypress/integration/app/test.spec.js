describe('Test demo', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
        cy.server();
    });

    it('Add and Delete People', () => {
        cy.route('GET','api/people').as('getAllPeople1');
        cy.route
        cy.get('.mat-toolbar > :nth-child(3) > a').click();
        cy.wait('@getAllPeople1');
        cy.get('[cy-people-card]').should('have.length', 10);
        cy.get('.mat-fab > .mat-button-wrapper > .material-icons').click();
        cy.get('cy|submitButton').as('submitButton').should('be.disabled');
        cy.fillForm();
        cy.get('@submitButton').should('not.be.disabled').click();
        cy.route('GET','api/people').as('getAllPeople2');
        cy.wait('@getAllPeople2').its('status').should('eq', 200);
        cy.get('[cy-people-card]').should('have.length', 11);
        cy.get(':nth-child(11) > .mat-card').scrollIntoView().should('be.visible');
        cy.get(':nth-child(11) > .mat-card > .mat-card-content > .buttons-info > [title="Delete"] > .mat-button-wrapper > .mat-icon').click();
        cy.get('[cy-people-card]').should('have.length', 10);
    });
});
