module.exports = (api, opts) => {
  api.configureWebpack(webpackConfig => {
    webpackConfig.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
  })
}
