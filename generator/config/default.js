const fs = require('fs')

module.exports = (api, opts, rootOpts) => {
  // Update
  if (opts.replaceComponents) {
    // Render files if we're replacing
    const routerPath = api.resolve('./src/router.js')
    opts.router = fs.existsSync(routerPath)

    if (opts.router) {
      files['./src/views/Home.vue'] = './templates/default/src/views/Home.vue'
    } else {
      files['./src/components/HelloWorld.vue'] = './templates/default/src/components/HelloWorld.vue'
    }

    const files = {
      './src/App.vue': './templates/default/src/App.vue',
      './src/assets/logo.png': './templates/default/src/assets/logo.png'
    }

    api.render(files, opts)
  }
}
