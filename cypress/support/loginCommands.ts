export const loginWithUsername = () => {
  cy.visit("https://smart-data-entry-ui.vercel.app/auth")

  cy.log('Email:', Cypress.env('EMAIL'));
  cy.log('Password:', Cypress.env('PASSWORD'));

  cy.get("#supertokens-root")
    .shadow()
    .find('input[name="email"]')
    .type(Cypress.env("EMAIL")); // Using environment variable for email

  cy.get("#supertokens-root")
    .shadow()
    .find('input[name="password"]')
    .type(Cypress.env("PASSWORD")); // Using environment variable for password

  cy.get("#supertokens-root").shadow().find('button[type="submit"]').click();
  cy.wait(3000);
};
