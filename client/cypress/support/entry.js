/* eslint-disable no-undef */

Cypress.Commands.add("createEntry", (title, description, year) => {
  cy.visit("http://localhost:3000/story/13/addEntry");

  cy.get("button[name=text]").click();
  cy.get("input[name=title]").type(title);
  cy.get("textarea[name=description]").type(description);
  cy.get("input[name=year]").type(year);

  cy.get(".submit-createEntry").click();
});

Cypress.Commands.add("deleteEntry", (title) => {
  cy.visit("http://localhost:3000/story/13");

  cy.get(`div[name='${title}']`).click();
  cy.get(".editEntry-button").click();
  cy.get(".delete-entry").click();
});
