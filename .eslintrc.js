module.exports = {
  root: true,
  env: { node: true },
  extends: ['@nekohack/eslint-config', 'plugin:vue/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
