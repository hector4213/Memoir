/* eslint-disable no-undef */

import Chance from 'chance'
const chance = Chance()

Cypress.Commands.add('createStory', () => {
    const embed = 'https://tinyurl.com/y9k8r33z'
    const name = chance.name()
    const occupation = chance.city()

    cy.visit('http://localhost:3000/profile')
    cy.get('.addStory').click()

    cy.get('input[name=embed]').type(embed)
    cy.get('input[name=name]').type(name)
    cy.get('input[name=occupation]').type(occupation)
    cy.get('.submit-createStory').click()

    cy.get('.storycard-template')
        .should('contain', name)

    cy.get(`div[name='${name}']>.delete`).click()
})