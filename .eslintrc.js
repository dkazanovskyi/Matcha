module.exports = {
  extends: ['react-app', 'prettier', 'eslint:recommended'],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  rules: {
    'jsx-quotes': [1, 'prefer-double'],
    'no-console': 1,
    CamelCase: {
      properties: 'always',
      ignoreDestructuring: true
    },
    'no-extra-semi': 2,
    semi: [2, 'never']
  },
  plugins: ['prettier']
}
