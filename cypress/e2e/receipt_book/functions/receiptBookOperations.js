// Define a function to create a receipt book
export function createReceiptBook(receiptBookNumber, receiptSeriesNumber, totalReceipts, financialYear) {
  cy.get("button[class='chakra-button css-1ur5r0m']").click(); // Click the create receipt book button

  cy.get("input[name='receiptBookNumber']").type(receiptBookNumber); // Enter receipt book number

  cy.get("input[name='receiptSeries']").type(receiptSeriesNumber); // Enter receipt series number

  cy.get("input[name='totalReceipts']").type(totalReceipts); // Enter the total number of receipts

  cy.get("input[name='financialYear']").type(financialYear); // Enter the financial year

  cy.get("button[class='chakra-button css-h211ee']").click(); // Click the submit button to create receipt book

  cy.get('#toast-1-title').should('have.text', 'Receipt Book Created'); // Verify the success toast message

  cy.get("button[class='chakra-button css-1ur5r0m']").click(); // Click the back to receipt books button
}

// Define a function to search a receipt book
export function searchReceiptBook(receiptBookNumber) {
  cy.get('.chakra-input.css-1cjy4zv').type(receiptBookNumber);

  cy.get('.css-xumdn4').contains(receiptBookNumber); // Assert that the search results contain the desired number
}

// Define a function to edit a receipt book
export function editReceiptBook(newReceiptBookNumber, newReceiptSeries, newTotalReceipts, newFinancialYear, oldReceiptBookNumber) {
  cy.get('tbody tr td a[data-cy$="receipt-book-link"]').each(($el) => {
    if ($el.text().trim() === oldReceiptBookNumber) {
      cy.wrap($el).parents('tr').find('button[data-cy="edit-receipt-book-button"]').click(); // find parent and then traverse one level up
    }
  });

  cy.get("input[name='receiptBookNumber']").type(newReceiptBookNumber); // Update the receipt book number

  cy.get("input[name='receiptSeries']").type(newReceiptSeries); // Update the receipt series number

  cy.get("input[name='totalReceipts']").type(newTotalReceipts); // Update the total number of receipts

  cy.get("input[name='financialYear']").clear().type(newFinancialYear); // Update the financial year

  cy.get("button[class='chakra-button css-h211ee']").click(); // Submit the updated details

  cy.get('#toast-1-title').should('be.visible').contains('Receipt Book Updated'); // Verify the success toast message for update

  cy.get("button[class='chakra-button css-1ur5r0m']").click(); // Return to the receipt books list
}

// Define a function to delete a receipt book
export function deleteReceiptBook(newReceiptBookNumber) {
  cy.get('tbody tr td').each(($el) => {
    if ($el.text().trim() === newReceiptBookNumber) {
      cy.wrap($el).parents('tr').find('button[data-cy="delete-receipt-book-button"]').click();
    }
  });

  cy.get("button[class='chakra-button css-f2hjvb']").click();

  cy.get('#toast-1-title').should('have.text', 'Receipt Book Deleted');
}
