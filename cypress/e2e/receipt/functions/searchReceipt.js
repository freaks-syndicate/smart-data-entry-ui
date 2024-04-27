export function searchReceipt(name) {
  cy.get(
    "input[placeholder='Search by Name, Receipt Number, Aadhar Number, PAN Number']"
  ).type(name)
  cy.get("table tbody tr:first").contains(name)
}
