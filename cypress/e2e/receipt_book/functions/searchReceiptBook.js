// Define a function to search a receipt book

export function searchReceiptBook(searchReceiptBook) {
  cy.reload();
  // Search by receipt book number or series in the search input
  cy.get('.chakra-input.css-1cjy4zv').type(searchReceiptBook);

  // Assert that the search results contain the number 1
  cy.get('.css-xumdn4').contains(searchReceiptBook);
}
