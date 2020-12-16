/* eslint-disable no-undef */

const embed = 'https://tinyurl.com/y9k8r33z'

Cypress.Commands.add('createStory', (name, occupation) => {
    cy.visit('http://localhost:3000/profile')
    cy.get('.addStory').click()

    cy.get('input[name=embed]').type(embed)
    cy.get('input[name=name]').type(name)
    cy.get('input[name=occupation]').type(occupation)
    cy.get('.submit-createStory').click()

    cy.get('.storycard-template')
        .should('contain', name)
})

Cypress.Commands.add('deleteStory', (name) => {
    cy.visit('http://localhost:3000/profile')
    cy.get(`div[name='${name}'] > .delete`).click()
})