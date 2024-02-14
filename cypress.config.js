const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: '5m2roh',
    viewportHeight: 880,
    viewportWidth: 1280,
    chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})