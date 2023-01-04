const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: '5m2roh',
    viewportHeight: 860, 
    viewportWidth: 410,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})