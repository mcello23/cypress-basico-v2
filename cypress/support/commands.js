Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (){
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('marceloadsc@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})