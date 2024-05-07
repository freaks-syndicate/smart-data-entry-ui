//Define a function to create a receipt
export function createReceipt(
  newReceiptBookNumber,
  name,
  receiptNumber,
  amount,
  modeOfPayment,
  mobile,
  aadharNumber,
  panNumber,
  financialYear,
  address,
) {
  cy.get('tbody tr td a[data-cy$="receipt-book-link"]').each(($el) => {
    if ($el.text().trim() === newReceiptBookNumber) {
      cy.wrap($el).click();
    }
  }); // open receipt book

  cy.get('#receipt-book-number-heading').should('be.visible').contains(newReceiptBookNumber); // verify receipt book number

  cy.get('body').then((body) => {
    if (body.find(".chakra-badge.css-gagmni:contains('BOOK FULL')").length > 0) {
      cy.get('.container').contains('Home').click();
    } else {
      cy.get("button[class='chakra-button css-1ur5r0m']").click();
    }
  });

  cy.get("input[name='name']").type(name);

  cy.get("input[name='receiptNumber']").type(receiptNumber);

  cy.get("input[name='amount']").type(amount);

  cy.get("select[name='modeOfPayment']").select(modeOfPayment);

  cy.get("input[name='mobileNumber']").type(mobile);

  cy.get("input[name='aadharNumber']").type(aadharNumber);

  cy.get("input[name='panNumber']").type(panNumber);

  cy.get("input[name='financialYear']").type(financialYear);

  cy.get("textarea[name='address']").type(address);

  cy.get('.chakra-button.css-h211ee').click();

  cy.get('#toast-1-title').should('have.text', 'Receipt Created'); // Verify the success toast message

  cy.get('.chakra-button.css-1ur5r0m').click(); // click on back to receipts

  cy.reload();
}

//Define a function to search a receipt
export function searchReceipt(name, newReceiptBookNumber) {
  cy.get('tbody tr td a[data-cy$="receipt-book-link"]').each(($el) => {
    if ($el.text().trim() === newReceiptBookNumber) {
      cy.wrap($el).click();
    }
  }); // open receipt book

  cy.get('#receipt-book-number-heading').should('be.visible').contains(newReceiptBookNumber); // verify receipt book number

  cy.get("input[placeholder='Search by Name, Receipt Number, Aadhar Number, PAN Number']").type(name);

  cy.get('tbody tr td').each(($el) => {
    if ($el.text().trim() === name) {
      cy.wrap($el).should('have.text', name);
    }
  });
}

//Define a function to edit a receipt
export function editReceipt(
  newReceiptBookNumber,
  receiptNumber,
  newName,
  newReceiptNumber,
  newAmount,
  newModeOfPayment,
  newAadharNumber,
  newPanNumber,
  newFinancialYear,
  newAddress,
) {
  cy.get('tbody tr td a[data-cy$="receipt-book-link"]').each(($el) => {
    if ($el.text().trim() === newReceiptBookNumber) {
      cy.wrap($el).click();
    }
  }); // open receipt book

  cy.get('tbody tr td a[data-cy="receipt-link"]').each(($el) => {
    if ($el.text().trim() === receiptNumber) {
      cy.wrap($el).parents('tr').find("button[data-cy='edit-receipt-button']").click();
    }
  });

  cy.get("input[name='name']").clear().type(newName);

  cy.get("input[name='receiptNumber']").type('{selectall}').type(newReceiptNumber);

  cy.get("input[name='amount']").type('{selectall}').type(newAmount);

  cy.get("select[name='modeOfPayment']").select(newModeOfPayment);

  cy.get("input[name='aadharNumber']").type('{backspace}').type(newAadharNumber);

  cy.get("input[name='panNumber']").clear().type(newPanNumber);

  cy.get("input[name='financialYear']").type('{selectall}').type(newFinancialYear);

  cy.get("textarea[name='address']").type('{selectall}').type(newAddress);

  cy.get('.chakra-button.css-h211ee').click();

  cy.get('#toast-1-title').should('be.visible').and('have.text', 'Receipt Updated'); // Verify the success toast message
}

//Define a function to delete a receipt
export function deleteReceipt(newName, newReceiptBookNumber) {
  cy.get('tbody tr td a[data-cy$="receipt-book-link"]').each(($el) => {
    if ($el.text().trim() === newReceiptBookNumber) {
      cy.wrap($el).click();
    }
  }); // open receipt book

  cy.get('tbody tr td[title="Lorem Ipsum Doe"]').each(($el) => {
    if ($el.text().trim() === newName) {
      cy.wrap($el).parents('tr').find("button[data-cy='delete-receipt-button']").click();
    }
  });

  cy.contains('button', 'Yes').click();

  cy.get('#toast-1-title').should('have.text', 'Receipt Deleted');

  cy.get(
    "a[class='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500']",
  ).click(); // click on Home to go to receipt book page

  cy.get("h2[data-cy='page-heading']").contains('Receipt Books');
}
