export function searchReceipt(name) {
  cy.get("input[placeholder='Search by Name, Receipt Number, Aadhar Number, PAN Number']").type(name);

  // cy.get('tbody tr:first').contains(name);
  cy.get('tbody tr td').each(($el) => {
    if ($el.text().trim() === name) {
      cy.wrap($el).should('have.text', name);
    }
  });
}
