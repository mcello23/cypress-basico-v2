const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    projectId: '5m2roh',
    viewportHeight: 860, 
    viewportWidth: 410,
  e2e: {
    baseUrl: "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
