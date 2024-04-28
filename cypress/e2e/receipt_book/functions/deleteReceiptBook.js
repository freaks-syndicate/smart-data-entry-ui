export function deleteReceiptBook(receiptBookNumber) {
  cy.get('tbody tr td').each(($el) => {
    if ($el.text().trim() === receiptBookNumber) {
      cy.wrap($el).parents('tr').find('button[data-cy="delete-receipt-book-button"]').click();
    }
  });

  cy.get("button[class='chakra-button css-f2hjvb']").click();

  cy.get('#toast-3-title').should('have.text', 'Receipt Deleted');
}
