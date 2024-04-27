// Define a function to edit a receipt book
export function editReceiptBook(
  receiptBookNumber,
  receiptSeries,
  totalReceipts,
  financialYear
) {
  // Click the edit button on the last receipt book record in the list
  cy.get("table tbody tr:last").find("button.chakra-button.css-lgnrpw").click()

  cy.get("input[name='receiptBookNumber']").type(receiptBookNumber) // Update the receipt book number

  // Update the receipt series number
  cy.get("input[name='receiptSeries']").type(receiptSeries)

  // Update the total number of receipts
  cy.get("input[name='totalReceipts']").type(totalReceipts)

  // Update the financial year
  cy.get("input[name='financialYear']").clear().type(financialYear)

  cy.get("button[class='chakra-button css-h211ee']").click() // Submit the updated details

  cy.get("#toast-2-title").should("be.visible").contains("Receipt Book Updated") // Verify the success toast message for update

  cy.get("button[class='chakra-button css-1ur5r0m']").click() // Return to the receipt books list
}
