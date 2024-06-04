/// <reference types="cypress" />

import { setupClerkTestingToken } from "@clerk/testing/cypress"

describe("Auth Flow", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  const createRandomTestEmail = () => {
    const randomNumbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 10)
    )
    return `${randomNumbers.join("")}+clerk_test@example.com`
  }
  it("Signs up and completes tutorial", () => {
    setupClerkTestingToken()
    cy.clearCookies({ domain: "http://localhost:3000" })
    cy.visit("/")
    cy.get("[data-cy=sign-up-button]").click()
    cy.get("input[type=email]").type(createRandomTestEmail())
    cy.wait(300)
    cy.get("input[type=password]").type("Test123Password?")
    cy.get("[data-localization-key=formButtonPrimary]").click()

    cy.wait(1000)

    cy.get("input[name=codeInput-0]").type("4")
    cy.get("input[name=codeInput-1]").type("2")
    cy.get("input[name=codeInput-2]").type("4")
    cy.get("input[name=codeInput-3]").type("2")
    cy.get("input[name=codeInput-4]").type("4")
    cy.get("input[name=codeInput-5]").type("2")

    cy.wait(3000)

    cy.get("[data-cy=subject-0]").click()
    cy.get("[data-cy=subject-1]").click()
    cy.get("[data-cy=continue-button]").click()

    cy.wait(1000)

    cy.get("[data-cy=country-1]").click()
    cy.get("[data-cy=continue-button]").click()

    cy.wait(1000)

    cy.get("[data-cy=input]").type("Test123")
    cy.get("[data-cy=continue-button]").click()
  })
})
