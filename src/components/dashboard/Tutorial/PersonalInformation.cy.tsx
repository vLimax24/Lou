/// <reference types="cypress" />

import React from "react"
import PersonalInformation from "./PersonalInformation"

describe("Personal Information Tutorial", () => {
  let username
  let setUsername

  beforeEach(() => {
    username = ""
    setUsername = cy.stub().as("setUsername")

    cy.mount(
      <PersonalInformation username={username} setUsername={setUsername} />
    )
  })

  it("Renders the component", () => {
    cy.get("[data-cy=form]").should("exist")
    cy.get("[data-cy=label]").should("exist")
    cy.get("[data-cy=input]").should("exist")
  })

  it("Should display an error message if the username is empty", () => {
    cy.get("form").submit()
    cy.get(".error-message")
      .should("exist")
      .and("contain", "Username is required")
  })

  it("Should not display an error message with a valid username", () => {
    const validUsername = "validUser123"

    cy.get("[data-cy=input]").type(validUsername)
    cy.get("@setUsername").should("have.been.calledWith", validUsername)
    cy.get("[data-cy=submit]").click()
    cy.get("[data-cy=error-message]").should("not.exist")
  })

  it("Should display a specific error message for invalid username format", () => {
    const invalidUsername = "invalid@user"

    cy.get("[data-cy=input]").type(invalidUsername)
    cy.get("@setUsername").should("have.been.calledWith", invalidUsername)
    cy.get("[data-cy=submit]").click()
    cy.get("[data-cy=error-message]")
      .should("exist")
      .and("contain", "Invalid username format")
  })
})
