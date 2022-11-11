describe('expense generator test', () => {
    it('visits the root', () => {
        cy.visit('/');
    });
    it('clicks the menu button generator option', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'generator').click();
    });
    it('selects a vendor', () => {
        cy.wait(500);
        cy.get('mat-select[formcontrolname="vendorid"]').click();
        cy.contains('Manh Cuong').click();
    });
    it('selects an product 4', () => {
        cy.wait(500);
        cy.get('mat-select[formcontrolname="productid"]').click();
        cy.contains('product4').click();
        cy.wait(500);
        cy.get('mat-select[formcontrolname="eoq"]').click();
        cy.contains('2').click();
        cy.get('mat-select[formcontrolname="eoq"]').click();
        cy.contains('3').click();
    });
    it('select product 5', () =>{
        cy.wait(500);
        cy.get('mat-select[formcontrolname="productid"]').click();
        cy.contains('product5').click();
        cy.wait(500);
        cy.get('mat-select[formcontrolname="eoq"]').click();
        cy.contains('2').click();
        cy.get('mat-select[formcontrolname="eoq"]').click();
        cy.contains('4').click();
    })
    it('selects a Qty of EOQ', () => {
        cy.wait(500);
        cy.get('mat-select[formcontrolname="productid"]').click();
        cy.contains('product6').click();
        cy.wait(500);
        cy.get('mat-select[formcontrolname="eoq"]').click();
        cy.contains('1').click();
        cy.get('mat-select[formcontrolname="eoq"]').click();
        cy.contains('2').click();
    });
    it('clicks the save button', () => {
        cy.get('button').contains('Add PO').click();
    });
    it('confirms PO created', () => {
        cy.contains('added!');
    });
});