export function deleteReceiptBook(receiptBookNumber) {
  cy.get('table tbody tr:last').contains(receiptBookNumber);
  cy.get("button[data-cy='delete-receipt-book-button']").click();
  cy.get('.chakra-button css-f2hjvb').click();
  cy.get('#toast-1-title').should('have.text', 'Receipt Book Deleted');
}
