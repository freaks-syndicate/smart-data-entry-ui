export function editReceipt(name, receiptNumber, amount, modeOfPayment, aadharNumber, panNumber, year, address) {
  //cy.get("table tbody tr:first").contains("LoremIpsum")
  cy.get("button[data-cy='edit-receipt-button']").click();

  cy.get("input[name='name']").type(name);

  cy.get("input[name='receiptNumber']").type('{selectall}').type(receiptNumber);

  cy.get("input[name='amount']").type('{selectall}').type(amount);

  cy.get("select[name='modeOfPayment']").select(modeOfPayment);

  //cy.get("input[name='mobileNumber']").type("{selectall}").type(mobile)

  cy.get("input[name='aadharNumber']").type('{backspace}').type(aadharNumber);

  cy.get("input[name='panNumber']").clear().type(panNumber);

  cy.get("input[name='financialYear']").type('{selectall}').type(year);

  cy.get("textarea[name='address']").type('{selectall}').type(address);

  cy.get('.chakra-button.css-h211ee').click();

  cy.get('#toast-1-title').should('be.visible').and('have.text', 'Receipt Updated'); // Verify the success toast message
}
