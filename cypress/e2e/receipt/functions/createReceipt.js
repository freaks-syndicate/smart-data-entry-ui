export function createReceipt(receiptBookNumber, name, amount, modeOfPayment, mobile, aadharNumber, panNumber, year, address) {
  // open receipt book
  cy.get('tbody tr td a[data-cy$="receipt-book-link"]').each(($el) => {
    if ($el.text().trim() === receiptBookNumber) {
      cy.wrap($el).click();
    }
  });

  cy.get('#receipt-book-number-heading').should('be.visible').contains(receiptBookNumber); // verify receipt book number

  cy.get('body').then((body) => {
    if (body.find(".chakra-badge.css-gagmni:contains('BOOK FULL')").length > 0) {
      // If "BOOK FULL" is found, go back to home
      cy.get('.container').contains('Home').click();
    } else {
      // Else, click to create a new receipt
      cy.get("button[class='chakra-button css-1ur5r0m']").click();
    }
  });

  cy.get("input[name='name']").type(name);

  cy.get("input[name='amount']").type(amount);

  cy.get("select[name='modeOfPayment']").select(modeOfPayment);

  cy.get("input[name='mobileNumber']").type(mobile);

  cy.get("input[name='aadharNumber']").type(aadharNumber);

  cy.get("input[name='panNumber']").type(panNumber);

  cy.get("input[name='financialYear']").type(year);

  cy.get("textarea[name='address']").type(address);

  cy.get('.chakra-button.css-h211ee').click();

  cy.get('#toast-1-title').should('have.text', 'Receipt Created'); // Verify the success toast message

  cy.get('.chakra-button.css-1ur5r0m').click(); // click on back to receipts

  cy.reload();
}
