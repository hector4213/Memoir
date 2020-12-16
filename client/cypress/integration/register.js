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


describe('Creating and Deleting', () => {
    it('Profile', () => {
        cy.registerUser(username, email, password)
        cy.deleteUser()
    })

    it('Story', () => {
        cy.loginUser('michael', 'michael@email.com', 'hell0World!')
        cy.createStory(username, occupation)
        cy.deleteStory(username)
        cy.logoutUser()
    })

    it('Entry', () => {
        cy.loginUser('michael', 'michael@email.com', 'hell0World!')
        cy.createEntry(title, description, year)
        cy.deleteEntry(title)
        cy.logoutUser()
    })
})