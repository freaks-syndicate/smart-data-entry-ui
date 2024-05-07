export const loginWithUsername = () => {
    cy.visit("https://smart-data-entry-ui.vercel.app/auth")
  
    cy.get("#supertokens-root")
      .shadow()
      .find('input[name="email"]')
      .type(Cypress.env("EMAIL")); // Using environment variable for email
  
    cy.get("#supertokens-root")
      .shadow()
      .find('input[name="password"]')
      .type(Cypress.env("PASSWORD"), {log: false}); // Using environment variable for password
  
    cy.get("#supertokens-root").shadow().find('button[type="submit"]').click();
    cy.url().should('eq', 'https://smart-data-entry-ui.vercel.app/');
};
