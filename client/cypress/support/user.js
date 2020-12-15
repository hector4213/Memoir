/* eslint-disable no-undef */
// https://on.cypress.io/custom-commands

Cypress.Commands.add('registerUser', (username, email, password) => {
    cy.visit('http://localhost:3000')

    cy.get('button').click()
        .should('contain', 'Register')

    cy.get('input[name=username]').type(username)
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('input[name=repassword]').type(password)
    cy.get('.submit-register').click()

    cy.get('.pageTitle')
        .should('contain', username)

})

Cypress.Commands.add('deleteUser', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('.edit-profile-btn').click()
    cy.get('.delete-profile').click()

    cy.get('h1')
        .should('contain', 'Memoir')
})

Cypress.Commands.add('loginUser', (username, email, password) => {
    cy.visit('http://localhost:3000/')
    cy.get('button').click()
    cy.get('button[name=login]').click()

    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('.submit-login').click()


    cy.get('.pageTitle')
        .should('contain', username)
})