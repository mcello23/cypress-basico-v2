const { defineConfig } = require("cypress");

module.exports = defineConfig({
    baseUrl: "http://localhost:8080",
    chromeWebSecurity: false,
    projectId: '5m2roh',
    viewportHeight: 860, 
    viewportWidth: 410,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
