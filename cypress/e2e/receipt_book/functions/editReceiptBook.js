// Define a function to edit a receipt book
export function editReceiptBook(receiptBookNumber, receiptSeries, totalReceipts, financialYear, oldReceiptBookNumber) {
  cy.get('tbody tr td a[data-cy$="receipt-book-link"]').each(($el) => {
    if ($el.text().trim() === oldReceiptBookNumber) {
      cy.wrap($el).parents('tr').find('button[data-cy="edit-receipt-book-button"]').click(); // find parent and then traverse one level up
    }
  });

  cy.get("input[name='receiptBookNumber']").type(receiptBookNumber); // Update the receipt book number

  // Update the receipt series number
  cy.get("input[name='receiptSeries']").type(receiptSeries);

  // Update the total number of receipts
  cy.get("input[name='totalReceipts']").type(totalReceipts);

  // Update the financial year
  cy.get("input[name='financialYear']").clear().type(financialYear);

  cy.get("button[class='chakra-button css-h211ee']").click(); // Submit the updated details

  cy.get('#toast-1-title').should('be.visible').contains('Receipt Book Updated'); // Verify the success toast message for update

  cy.get("button[class='chakra-button css-1ur5r0m']").click(); // Return to the receipt books list
}
