declare namespace Cypress {
    interface Chainable {
        loginWithUsername(): Chainable<void>
        logout(): Chainable<void>
    }
}