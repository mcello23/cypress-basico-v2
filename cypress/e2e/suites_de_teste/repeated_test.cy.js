Cypress._.times(3, function() {
  it.only('testa a página da política de privacidade de forma independente', function() {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
})