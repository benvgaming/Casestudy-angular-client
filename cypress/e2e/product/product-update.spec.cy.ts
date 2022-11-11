
describe('product update test', () => {
    it('visits the root', () => {
        cy.visit('/');
    });
    it('clicks the menu button products option', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'products').click();
    });
    it('selects Test product', () => {
        cy.contains('Test Product').click();
    });
    it('updates cost field', () => {

        cy.get('input[formcontrolname=costprice]').clear();
        cy.get('input[formcontrolname=costprice]').type('100.99');
    });
    it('clicks the save button', () => {
        cy.get('button').contains('Save').click();
    });
    it('confirms update', () => {
        cy.contains('updated!');
    });
});