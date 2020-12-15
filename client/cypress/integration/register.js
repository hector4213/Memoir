/* eslint-disable no-undef */
/// <reference types="cypress" />
import Chance from 'chance'
const chance = new Chance()

describe('Registers User then Deletes', () => {
    const username = chance.name()
    const email = chance.email()
    const password = 'validPassw0rd!'

    // beforeEach(() => {
    //     cy.visit('http://localhost:3000')
    // })

    it('Registers User', () => {
        cy.visit('http://localhost:3000')
        cy.get('button').click()
            .should('contain', 'Register')

        cy.get('input[name=username]').type(username)
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(password)
        cy.get('input[name=repassword]').type(password)
        cy.get('.submit-register').click()

        cy.contains(username)
    })

    it('Deletes User', () => {
        cy.get('.edit-profile-btn').click()
        cy.get('.delete-profile').click()

        cy.contains('Memoir')
    })
})