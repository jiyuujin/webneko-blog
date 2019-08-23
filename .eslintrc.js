module.exports = {
  root: true,
  env: { node: true },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 1,
    strictFunctionTypes: false,
    typeof: false,
    'no-undef': 'error'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
