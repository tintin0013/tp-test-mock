const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'http://localhost:3000/tp-test-mock',

    setupNodeEvents(on, config) {
      // pas d'event particulier
    }

    //  on supprime testIsolation: false
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});