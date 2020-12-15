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

    it('Registers and Delete User', () => {
        cy.registerUser(username, email, password)
        cy.deleteUser()
    })
})

describe('Logs In User', () => {
    it('Logs In', () => {
        cy.loginUser('michael', 'michael@email.com', 'hell0World!')
    })
})