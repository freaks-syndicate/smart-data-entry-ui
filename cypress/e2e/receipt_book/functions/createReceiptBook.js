// Define a function to create a receipt book
export function createReceiptBook(
  receiptBookNumber,
  receiptSeriesNumber,
  totalReceipts,
  financialYear
) {
  cy.get("button[class='chakra-button css-1ur5r0m']").click() // Click the create receipt book button

  cy.get("input[name='receiptBookNumber']").type(receiptBookNumber) // Enter receipt book number

  cy.get("input[name='receiptSeries']").type(receiptSeriesNumber) // Enter receipt series number

  cy.get("input[name='totalReceipts']").type(totalReceipts) // Enter the total number of receipts

  cy.get("input[name='financialYear']").type(financialYear) // Enter the financial year

  cy.get("button[class='chakra-button css-h211ee']").click() // Click the submit button to create receipt book

  cy.get("#toast-1-title").should("have.text", "Receipt Book Created") // Verify the success toast message

  cy.get("button[class='chakra-button css-1ur5r0m']").click() // Click the back to receipt books button
}
