module.exports = {
  root: true,
  env: { node: true },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue/issues/746#issuecomment-451112435
    'plugin:vue/base'
    // 'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 1,
    strictFunctionTypes: 0,
    typeof: 0,
    'no-undef': 'error'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
