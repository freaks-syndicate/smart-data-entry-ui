export function deleteReceipt(name, home) {
  //  cy.get('table tbody tr:first').contains(name);
  cy.get('tbody tr td').each(($el) => {
    if ($el.text().trim() === name) {
      cy.wrap($el).parents('tr').find('button[data-cy="delete-receipt-button"]').click();
    }
  });

  cy.get("button[class='chakra-button css-f2hjvb']").click();

  cy.get('#toast-2-title').should('have.text', 'Receipt Deleted');

  // click on Home to go to receipt book page
  cy.get(
    "a[class='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500']",
  ).click();

  cy.get("h2[data-cy='page-heading']").contains('Receipt Books');
}
