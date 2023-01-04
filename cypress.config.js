const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: '5m2roh',
    viewportWidth: 410,  
    viewportHeight: 860, 
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
