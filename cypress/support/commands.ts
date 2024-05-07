/// <reference types="cypress" />
import { loginWithUsername } from "./loginCommands"
import { logout } from "./logoutCommands"

// Add a custom command to Cypress
Cypress.Commands.add("loginWithUsername", loginWithUsername)
Cypress.Commands.add("logout", logout)
