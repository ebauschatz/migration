describe('the login page', () => {
  it('accepts valid credentials', () => {
    cy.login()
    cy.contains('Your Events').should('exist')
  })
})

describe('on the races page ', () => {
  before (() => {
    cy.login()
  })

  it('races can be added, viewed, and deleted', () => {
    cy.get('.navSection > :nth-child(2)')
      .click()
    // ADD RACE COMPONENT

    // The Validate Address button should show the map
    cy.fillOutRaceForm("Cypress Test Race")
    cy.get('[data-cy="race-map"]').should("exist")

    // The Reset button should clear all fields
    cy.get('[data-cy="reset-button"]')
      .click()
    cy.get('[data-cy="race-name"]').should("have.value","")
    cy.get('[data-cy="start-date"]').should("have.value","")
    cy.get('[data-cy="finish-opens"]').should("have.value","")
    cy.get('[data-cy="finish-closes"]').should("have.value","")
    cy.get('[data-cy="address"]').should("have.value","")
    cy.get('[data-cy="city"]').should("have.value","")
    cy.get('[data-cy="state"]').should("have.value","")
    cy.get('[data-cy="zip"]').should("have.value","")

    // Add a new race
    cy.addRace("Cypress Test Race")

    // Submitting the form should clear all fields
    cy.get('[data-cy="race-name"]').should("have.value","")


    // VIEW RACES COMPONENT

    // Newly added race should display
    cy.contains("Cypress Test Race").should("exist")

    // Clicking the View & Edit link navigates to the Race Detail page
    cy.get(':nth-child(1) > .view-edit')
      .click()
    cy.contains('Details').should('exist')
    cy.get('.navSection > :nth-child(2)')
      .click()

    // Delete the new race
    cy.deleteRaceByName("Cypress Test Race")
  })
})