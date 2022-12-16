describe('the login page', () => {
  it('accepts valid credentials', () => {
    cy.login()
    cy.contains('Your Events').should('exist')
  })
})

describe('on the races page, ', () => {
  before (() => {
    cy.login()
  })

  it('races can be managed', () => {
    cy.get('.navSection > :nth-child(2)')
      .click()
      
    cy.addRace("Cypress Test Race")
    cy.contains("Cypress Test Race").should("exist")
    cy.get('[data-cy="race-name"]').should("have.value","")
    cy.deleteRaceByName("Cypress Test Race")
  })
})