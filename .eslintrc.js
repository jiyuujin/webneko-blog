module.exports = {
  extends: ['@nekohack/eslint-config-vue', 'plugin:vuejs-accessibility/recommended'],
  plugins: ['vuejs-accessibility', '@typescript-eslint'],
  root: true,
  env: { node: true, es6: true },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
