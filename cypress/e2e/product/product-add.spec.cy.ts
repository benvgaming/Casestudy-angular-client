
describe('product add test', () => {
    it('visits the root', () => {
        cy.visit('/');
    });
    it('clicks the menu button vendors option', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'products').click();
    });
    it('clicks add icon', () => {
        cy.contains('control_point').click();
    });
    it('fills in fields', () => {
        cy.get('input[formcontrolname=id]').type('1A5');
        cy.get('input[formcontrolname=name]').type('Test Product');
        
        cy.get('mat-select[formcontrolname="vendorid"]').click();
        cy.get('mat-option').contains('Shady Sams').click();
        
        cy.get('input[formcontrolname=costprice]').clear();
        cy.get('input[formcontrolname=costprice]').type('109.99');
        cy.get('.mat-expansion-indicator').eq(0).click();
        cy.get('.mat-expansion-indicator').eq(1).click();
        cy.get('input[formcontrolname=rop]').clear();
        cy.get('input[formcontrolname=rop]').type('10');

    });
    it('clicks the save button', () => {
        cy.get('button').contains('Save').click();
        cy.wait(500);
    });
    it('confirms add', () => {
        cy.contains('updated!');
    });
});