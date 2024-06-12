import React from "react"
import { AddNote } from "./NoteDialog"
import { ConvexReactClient, ConvexProvider } from "convex/react"
import { env } from "@/env"
import "../../../../styles/globals.css"

describe("Add Note Dialog", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)
    cy.mount(
      <ConvexProvider client={convex}>
        <AddNote />
      </ConvexProvider>
    )
  })
  it("renders", () => {
    const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)
    cy.mount(
      <ConvexProvider client={convex}>
        <AddNote />
      </ConvexProvider>
    )
  })
  it("creates a task with deadline", () => {
    cy.get("[data-cy=add-note-button]").click()
    cy.get("[data-cy=note-input]").type("Test")
    cy.get("[data-cy=description-input]").type("This is a test")
    cy.get("[data-cy=calendar-switch]").click()
    cy.get("[data-cy=calendar]").get("button").eq(10).click()
    cy.get("[data-cy=add-note-submit-button]").click()
  })
  it("creates a task without deadline", () => {
    cy.get("[data-cy=add-note-button]").click()
    cy.get("[data-cy=note-input]").type("Test")
    cy.get("[data-cy=description-input]").type("This is a test")
    cy.get("[data-cy=add-note-submit-button]").click()
  })
  it("submit without input", () => {
    cy.get("[data-cy=add-note-button]").click()
    cy.get("[data-cy=add-note-submit-button]").click()
    cy.get("[data-cy=note-error-message]").should("be.visible")
    cy.get("[data-cy=description-error-message]").should("be.visible")
    cy.get("[data-cy=note-error-message]").contains(
      "String must contain at least 2 character(s)"
    )
    cy.get("[data-cy=description-error-message]").contains(
      "String must contain at least 10 character(s)"
    )
  })
  it("submits with invalid note input", () => {
    cy.get("[data-cy=add-note-button]").click()
    cy.get("[data-cy=note-input]").type(" ")
    cy.get("[data-cy=description-input]").type("This is a test")
    cy.get("[data-cy=add-note-submit-button]").click()
    cy.get("[data-cy=note-error-message]").should("be.visible")
    cy.get("[data-cy=description-error-message]").should("not.exist")
    cy.get("[data-cy=note-error-message]").contains(
      "String must contain at least 2 character(s)"
    )
  })
  it("submits with invalid description input", () => {
    cy.get("[data-cy=add-note-button]").click()
    cy.get("[data-cy=note-input]").type("Test")
    cy.get("[data-cy=description-input]").type(" ")
    cy.get("[data-cy=add-note-submit-button]").click()
    cy.get("[data-cy=note-error-message]").should("not.exist")
    cy.get("[data-cy=description-error-message]").should("be.visible")
    cy.get("[data-cy=description-error-message]").contains(
      "String must contain at least 10 character(s)"
    )
  })
})
