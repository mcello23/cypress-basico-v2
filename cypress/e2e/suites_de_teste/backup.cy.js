describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
})
  it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#email').type('marceloadsasdasdsad,com')
    cy.get('button[type="submit"]').click()
    //assertion:
    cy.get('.error').should('be.visible')
  })
})

