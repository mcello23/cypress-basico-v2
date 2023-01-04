const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    projectId: '5m2roh',
    viewportHeight: 860, 
    viewportWidth: 410,
  e2e: {
    baseUrl: 'http://localhost:61566/__/#/specs/runner?file=cypress/e2e/suites_de_teste/_suite_de_testes.cy.js'
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
