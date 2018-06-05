module.exports = api => {
  api.extendPackage({
    devDependencies: {
      'babel-plugin-transform-imports': '^1.4.1',
      'stylus': '^0.54.5',
      'stylus-loader': '^3.0.1',
    }
  })
}
