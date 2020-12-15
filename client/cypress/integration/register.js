/* eslint-disable no-undef */

/// <reference types="cypress" />
import Chance from 'chance'
const chance = new Chance()

const username = chance.name()
const email = chance.email()
const password = 'validPassw0rd!'
const occupation = chance.city()

const title = chance.sentence()
const description = chance.paragraph()
const year = chance.year()


describe('Registers User then Deletes', () => {
    it('Registers and Delete User', () => {
        cy.registerUser(username, email, password)
        cy.deleteUser()
    })
})

describe('Create and Delete Story', () => {
    it('Logs in and creates a story', () => {
        cy.loginUser('michael', 'michael@email.com', 'hell0World!')
        cy.createStory(username, occupation)
        cy.deleteStory(username)
        cy.logoutUser()
    })
})

describe('Create and Delete Entry', () => {
    it('Logs in and creates and entry', () => {
        cy.loginUser('michael', 'michael@email.com', 'hell0World!')
        cy.createEntry(title, description, year)
        cy.deleteEntry(title)
        cy.logoutUser()
    })
})