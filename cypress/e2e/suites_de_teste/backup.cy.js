describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000 
  beforeEach(function() {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
})
  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Aqui está o texto super super longo que eu quero escrever nesta caixa de mensagens'

    cy.clock()

    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('marceloadsc@gmail.com')
    cy.get('#open-text-area').type(longText)
    cy.contains('button', 'Enviar').click()
    //assertion:
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })
  it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.clock()

    cy.get('#email').type('marceloadsasdasdsad,com')
    cy.contains('button', 'Enviar').click()
    //assertion:
    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })
  it('campo de telefone continua vazio quando preenchido com valor não-númerico', function() {
    cy.get('#phone').type('teste teste teste teste')
    cy.contains('button', 'Enviar').click().should('have.value', '')
  })
  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.clock()
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('marceloadsc@gmail.com')
    cy.get('#phone-checkbox').last().check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    const  
    firstName = 'Marcelo',
    secondName = 'Costa',
    email = 'marceloadsc@gmail.com',
    phone = '654524283'

    cy.get('#firstName').type(firstName).should('have.value', firstName).clear().should('have.value', '')
    cy.get('#lastName').type(secondName).should('have.value', secondName).clear().should('have.value', '')
    cy.get('#email').type(email).should('have.value', email).clear().should('have.value', '')
    cy.get('#phone').type(phone).should('have.value', phone).clear().should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) pelo texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product').select(1).should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })
  //selecionar todos os campos do radio
  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })
  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })
  //fazendo upload de arquivos
  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type=file]').should('not.have.value').selectFile('./cypress/fixtures/example.json')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type=file]').should('not.have.value').selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('meuArquivo')
    cy.get('input[type=file]').selectFile('./cypress/fixtures/example.json', { contents: '@meuArquivo' })
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  it('testa a página da política de privacidade de forma independente', function() {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
})

