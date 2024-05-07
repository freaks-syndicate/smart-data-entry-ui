// Logout from profile
export const logout = () => {
  cy.get(
    "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > button:nth-child(1)"
  ).click()

  cy.get(
    "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)"
  ).click()
}
