const Dotenv = require('dotenv-webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/global-scss/main.sass"`
      },
      scss: {
        prependData: `@import "~@/global-scss/main.scss";`
      }
    }
  }
}