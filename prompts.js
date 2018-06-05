module.exports = [
  {
    type: 'list',
    name: 'template',
    message: 'Vuetify Template Presets',
    choices: [
      {
        name: 'Default',
        value: 'default',
      },
      {
        name: 'SSR (Server Side Rendering)',
        value: 'ssr'
      }
    ],
    default: 'default'
  },
  {
    type: 'confirm',
    name: 'replaceComponents',
    message: 'Allow Vuetify to replace App.vue and HelloWorld.vue?',
    default: true,
    when: answers => answers.template !== 'ssr'
  },
  {
    type: 'confirm',
    name: 'useTheme',
    message: 'Use custom theme?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'useAlaCarte',
    message: 'Use a-la-carte components?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'usePolyfill',
    message: 'Use babel/polyfill?',
    default: true
  }
]
