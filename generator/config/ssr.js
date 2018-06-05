const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'

const createApiFile = TARGET_NODE
  ? './create-api-server.js'
  : './create-api-client.js'

  const target = TARGET_NODE
  ? 'server'
  : 'client'

module.exports = (api, opts, rootOpts, helpers) => {
  api.extendPackage({
    dependencies: {
      'cross-env': '^5.1.6',
      'vue-analytics': '^5.10.6',
      'vue-router': '^3.0.1',
      'vue-server-renderer': '^2.5.16',
      'vuex': '^3.0.1',
      'vuex-router-sync': '^5.0.0'
    },
    scripts: {
      'server': 'npm run build && node/scripts/serve',
      'build': 'npm run build:server && mv dist/vue-ssr-server-bundle.json bundle && npm run build:client && mv bundle dist/vue-ssr-server-bundle.json',
      'build:client': 'vue-cli-service build',
      'build:server': 'cross-env WEBPACK_TARGET=node vue-cli-service build',
      'start': 'cross-env NODE_ENV=production node scripts/start'
    }
  })

  api.render('../templates/ssr')

    // console.log(api.configureWebpack)
    // api.chainWebpack(webpack => {
    //   console.log(webpack)
    // })

    // chainWebpack: config => {
    //     config.module
    //     .rule('vue')
    //     .use('vue-loader')
    //     .tap(options =>
    //       merge(options, {
    //         optimizeSSR: false
    //       })
    //     )
    //   }
    // () => ({
    //     entry: `./src/entry-${target}`,
    //     target: TARGET_NODE ? 'node' : 'web',
    //     node: TARGET_NODE ? undefined : false,
    //     plugins: [
    //       TARGET_NODE
    //         ? new VueSSRServerPlugin()
    //         : new VueSSRClientPlugin()
    //     ],
    //     externals: TARGET_NODE ? nodeExternals({
    //       whitelist: /\.css$/
    //     }) : undefined,
    //     output: {
    //       libraryTarget: TARGET_NODE
    //         ? 'commonjs2'
    //         : undefined
    //     },
    //     optimization: {
    //       splitChunks: undefined
    //     },
    //     resolve:{
    //       alias: {
    //         'create-api': createApiFile
    //       }
    //     }
    //   })

  api.onCreateComplete(() => {
    helpers.updateMain(src => {
      const appImportIndex = src.findIndex(line => line.match(/^import App/))

      src.splice(appImportIndex, 1)

      const start = src.findIndex(line => line.match(/^new Vue/))
      const stop = src.findIndex(line => line.match(/^}\)\.\$mount/))

      src.splice(start, stop, 'export { createApp } from \'./plugins/ssr\'')

      return src
    })
  })
}
