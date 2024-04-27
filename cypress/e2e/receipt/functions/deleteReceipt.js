export function deleteReceipt(name) {
  cy.get('table tbody tr:first').contains(name);
  cy.get("button[data-cy='delete-receipt-button']").click();
  cy.get("button[class='chakra-button css-f2hjvb']").click();
  cy.get('#toast-2-title').should('have.text', 'Receipt Deleted');
  cy.get("a[href='/']").click();
}
