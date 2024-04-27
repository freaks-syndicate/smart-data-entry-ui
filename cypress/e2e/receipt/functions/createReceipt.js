export function createReceipt(
  name,
  receiptNumber,
  amount,
  modeOfPayment,
  mobile,
  aadharNumber,
  panNumber,
  year,
  address
) {
  cy.get("table tbody tr:last").contains("2024").click() // open receipt book
  cy.get(".css-1p0c83g")
    .should("be.visible")
    .and("have.text", "Receipt Book #2024") // verify receipt book number

  cy.get("body").then((body) => {
    if (
      body.find(".chakra-badge.css-gagmni:contains('BOOK FULL')").length > 0
    ) {
      // If "BOOK FULL" is found, go back to home
      cy.get(".container").contains("Home").click()
    } else {
      // Else, click to create a new receipt
      cy.get("button[class='chakra-button css-1ur5r0m']").click()
    }
  })

  cy.get("input[name='name']").type(name)

  cy.get("input[name='receiptNumber']").type(receiptNumber)

  cy.get("input[name='amount']").type(amount)

  cy.get("select[name='modeOfPayment']").select(modeOfPayment)

  cy.get("input[name='mobileNumber']").type(mobile)

  cy.get("input[name='aadharNumber']").type(aadharNumber)

  cy.get("input[name='panNumber']").type(panNumber)

  cy.get("input[name='financialYear']").type(year)

  cy.get("textarea[name='address']").type(address)

  cy.get(".chakra-button.css-h211ee").click()

  cy.get("#toast-1-title").should("have.text", "Receipt Created") // Verify the success toast message

  cy.get(".chakra-button.css-1ur5r0m").click() // click on back to receipts

  cy.reload()
}
