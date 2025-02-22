describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000 
  beforeEach(function() {
    cy.visit('/src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preencher nome e sobrenome', function() {
    // Lembrando que a função .type('texto', {delay: 0}) vem para ajudar a escrever algo mais rápido ou mais depressa
    // Ou seja, delay: 0 sería o mais rápido possível, fazendo o cypress sobreescrever o delay padrão que é 10
    // Se você colocar delay: 110 como abaixo é possível 'simular' uma pessoa escrevendo
    // Classe 11: uso do cy.clock() e cy.click() usados posteriormente
    // Basicamente o cy.clock() congela o clock to browser, fazendo a mensagem de erro sempre aparecer
    // Depois, em conjunto com o cy.tick(), avançamos 3 segundos pra mensagem  desaparecer
    // Aí, valida que a mensagem já não está
    // Isso tudo pq? Pra fazer o teste rodar mais rápido, ao invés de 3 segundos, roda em 1 segundo
    // Lembrando que implementei o cy.clock em vários testes a partir deste
    // O cy.clock é interessante usar quando vemos mensagens exibidas na tela, de erro, falta uma informação no formulário, etc
    cy.clock()
    cy.get('#firstName').should('be.visible')
      .type('Marcelo', {delay: 110}).should('have.value', 'Marcelo')
    cy.get('#lastName').should('be.visible')
      .type('Costa', {delay: 110}).should('have.value', 'Costa')
    cy.get('#email').should('be.visible')
      .type('marceloadsc@gmail.com', {delay: 110}).should('have.value', 'marceloadsc@gmail.com')
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').click().type('Reset da senha', {delay: 110})
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })
  it('Valida que exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    // Aqui uso seria um teste negativo, no qual um valido que a mensagem de erro aparece quando coloco um e-mail de formato invalido
    // Assert: na classe da mensagem de erro 
    cy.clock()
    cy.get('#firstName').should('be.visible')
    .type('Marcelo').should('have.value', 'Marcelo')
    cy.get('#lastName').should('be.visible')
    .type('Costa').should('have.value', 'Costa')
    cy.get('#email').should('be.visible')
    .type('marcelo@gmail,com')
    cy.get('#open-text-area').click().type('Comentário', {delay: 0})
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('.error>strong').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })
  it('Valida que o campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    // O legal aqui é que a validação é uma string vazia com o ''
    // O campo de telefone só aceita números e digitamos texto
    cy.get('#phone').type('meu telefone').should('have.value', '')
  })
  Cypress._.times(10, function(){
    // Isso aqui é o lodash, que é o ._.
    // Vc tem o repeat, e o times, no times vc coloca quntas vezes quer repetir o teste e a função de callback
    it('[Negative] Clicar na forma de contato telefone, e não preencher o telefone, valido que a mensagem de erro se exibe', function() {
      // Teste negativo, clico em Telefone em contato preferencial, não coloco telefone e tento dar submit
      cy.clock()
      cy.get('#firstName')
          .type('Marcelo')
      cy.get('#lastName').should('be.visible')
        .type('Costa')
      cy.get('#email').should('be.visible')
        .type('marceloadsc@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').click().type('Test', {delay: 0})
      cy.contains('button', 'Enviar').click();
      cy.get('.error').should('be.visible')
      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('.error').should('not.be.visible')
    })
  })
  it('[Negative] Clicar na forma de contato telefone, e não preencher o telefone, valido que a mensagem de erro se exibe', function() {
    // Teste negativo, clico em Telefone em contato preferencial, não coloco telefone e tento dar submit
    cy.clock()
    cy.get('#firstName')
        .type('Marcelo')
    cy.get('#lastName').should('be.visible')
      .type('Costa')
    cy.get('#email').should('be.visible')
      .type('marceloadsc@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').click().type('Test', {delay: 0})
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })
  it('[Negative] Validando que se pode preencher e apagar inputs', function() {
    // Teste negativo, faço input de textos, limpo e valido que todos passaram
    cy.get('#firstName')
        .type('Marcelo').clear().should('have.value', '')
    cy.get('#lastName').should('be.visible')
      .type('Costa').clear().should('have.value', '')
    cy.get('#email').should('be.visible')
      .type('marceloadsc@gmail.com').clear().should('have.value', '')
    cy.get('#phone').click().type('123912312', {delay: 0}).clear().should('have.value', '')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('[Negative] Validando que se vejo a mensagem de erro sem preencher nada', function() {
    cy.clock()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })
  it('envia o formulário com sucesso usando um comando customizado', function() {
    // O legal aqui é que um comando só dentro de commands.js está fazendo tudo, todos os passos
    // Lembrando que dá pra criar quantos commands.js quiser, basta importar dentro de index.js
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })
  // Mudei num exercicio que não está aqui:
  // cy.get('button[type="submit"]').click() para cy.contains('button', 'Enviar')
  // Fiz uma refatoração (refactoring), que significa mudar a estrutura do código sin cambiar su funcionamento
  // Podemos no tener un selector no muy especifico, y podemos utilizar un cy.contains para buscar elementos de texto al inves de cy.get
  it('[Select] Selecionando os itens do Seletor, um pelo texto, outro pelo valor e outro pelo índice', function() {
    // Aqui o teste usamos o .select(string) quando temos um seletor dentro da página
    // Cada teste aqui utiliza uma propriedade do .select, importante lembrar
    // Select fields chama isso
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
    cy.wait(1000)
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.wait(1000)
    cy.get('#product').select(1).should('have.value', 'blog')
    cy.wait(1000)
  })
  //Campos de seleção de radio button sóse pode marcar um por vez, importante lembrar
  it('[Radio] Fazer uso da função .check() no radio, marcando o atendimento Feedback', function() {
    // Aqui o teste usamos o .select(string) quando temos um seletor dentro da página
    // Cada teste aqui utiliza uma propriedade do .select, importante lembrar
    // Select fields chama isso
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })
  it('[Radio] Fazer uso da função .check(), marcando todas as opções do radio', function() {
    // Importante: aqui eu faço a seleção de cada radio e valido
    // É bom lembrar que temos o exemplo acima, que você pode selecionar com o value dentro do get
    // Prefiro mais a forma como fiz aqui, com o texto diretamente no check()
    cy.get('input[type="radio"]').check('ajuda').should('be.checked')
    cy.wait(1000)
    cy.get('input[type="radio"]').check('elogio').should('be.checked')
    cy.wait(1000)
    cy.get('input[type="radio"]').check('feedback').should('be.checked')
    cy.wait(1000)
  })
  it('[Radio] Fazer uso da função .check(), marcando todas as opções do radio', function() {
    // Eta nois, do jeitão do Walmyr...
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })
  it('[Checkboxes] Marcando ambos checkboxes, depois desmarcando o último', function() {
    // Sou foda, fiz tudo sozinho :)
    // A linha final é daora, com o input vc marca os dois elementos, o check vai pros dois
    // O last ele pega só o último e daí com o uncheck ele desmarca e valida que não foi marcado
    // Esse na real era o exercício
    cy.get('#email-checkbox').check()
    cy.wait(1000)
    cy.get('#email-checkbox').uncheck().should('not.be.checked')
    cy.wait(1000)
    cy.get('#phone-checkbox').check()
    cy.wait(1000)
    cy.get('#phone-checkbox').uncheck().should('not.be.checked')
    cy.wait(1000)
    cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
  })
  it('[Checkboxes] Exibe mesnagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', function() {
    // Sou foda :)
    cy.get('#phone-checkbox').check()
    cy.wait(1000)
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('[Upload][Select file] Seleciona um arquivo da pasta fixtures', function(){
    // O get ve o elemento do botão de fazer upload, o should valida que não tem nada nele
    // Logo, o selectFile faz o upload do arquivo dessa pasta que ta no fixtures, o json
    // Daí, criamos uma função de call back que valida que o arquivo que você fez o upload realmente subiu 
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('[Upload][Select File][Drag and drop] Simulando drag-and-drop', function(){
    // Esse aqui é a mesma coisa mas tem o action que simula um drag and drop (arrastar) um arquivo
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('[Upload][Select File] Fazendo upload com uma fixture com um alias', function(){
    // Aqui o que muda é usar o cy.fixture que já chama o arquivo diretamente da pasta fixture
    // E coloca um alias nele, no caso arquivoExemplo
    // Você então chama ele com @ no selectFile e faz a validação
    cy.fixture('example.json').as('arquivoExemplo')
    cy.get('input[type="file"]#file-upload')
    .selectFile('@arquivoExemplo')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('[Abrir link] Abre e política de privcidade abre em outra aba sem necessidade de click', function(){
    //Como a funcionalidade de abrir uma nova aba vem do "target=_blank" que está inserido no HTML
    // Aqui tem uma forma de contornar isso, validando o link na mesma aba
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  // IMPORTANTISSIMO: para abrir uma página na mesma aba do Cypress, usar o
  // .invoke('removeAttr', target) e dai fazer um clique
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  it('Testa a página da política de privacidade de forma independente', function(){
  // Isso aqui deveria estar em outro spec na real...
  // Mas assim também funciona
    cy.visit('/src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  it(`preenche a area de texto usando o comando invoke`, function(){
    // Esse teste é interessantissimo pq você usa o invoke chamando o valor com .invoke('val') do id que faz o get!
    // Logo, você adiciona a constante que criou, e valida que essa constante tem o valor que você passou
    const longText = Cypress._.repeat('0123456789', 20)
    cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
  })

it('[API]Fazendo uma requisição HTTP', function(){
  // Legal, dá pra fazer teste de api dentro do Cypress
  cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  .should(function(response) {
    const { status, statusText, body } = response
    expect(status).to.equal(200)
    expect(statusText).to.equal('OK')
    expect(body).to.include('CAC TAT')
    })
  })
  it('Encontrando o gato escondido', function(){
    cy.get('#cat').invoke('show').should('be.visible')
  })
})