Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/')
    
    cy.get('[data-cy="username-input"]')
      .type('emilyb')

    cy.get('[data-cy="password-input"]')
      .type('password1@')

    cy.get('[data-cy="login-button"]')
      .click()
})

Cypress.Commands.add('deleteRaceByName', (raceName) => {
    cy.contains(raceName)
      .parents('tr')
      .find('[data-cy="delete-button"]')
      .click()
})

Cypress.Commands.add('addRace', (raceName) => {
    cy.get('[data-cy="race-name"]')
      .type(raceName)
    cy.get('[data-cy="start-date"]')
      .type('2023-05-01')
    cy.get('[data-cy="finish-opens"]')
      .type('2023-05-02T14:30')
    cy.get('[data-cy="finish-closes"]')
      .type('2023-05-02T19:30')
    cy.get('[data-cy="address"]')
      .type('89 E 42nd St')
    cy.get('[data-cy="city"]')
      .type('New York')
    cy.get('[data-cy="state"]')
      .type('NY')
    cy.get('[data-cy="zip"]')
      .type('10017')

    cy.get('[data-cy="validate-button"]')
      .click()
    cy.wait(5000)
    cy.get('[data-cy="submit-button"]')
      .click()
})