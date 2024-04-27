export const loginWithUsername = () => {
  cy.visit("https://smart-data-entry-ui.vercel.app/auth")

  cy.get("#supertokens-root") // replace with the ID of your shadow DOM host element
    .shadow()
    .find('input[name="email"]')
    .type("rugvedij1804@gmail.com")

  cy.get("#supertokens-root")
    .shadow()
    .find('input[name="password"]')
    .type("Rugvedi18")

  cy.get("#supertokens-root").shadow().find('button[type="submit"]').click()
  cy.wait(3000)
}
