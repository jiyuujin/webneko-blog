module.exports = {
    extends: ['@nekohack/eslint-config-vue'],
    plugins: ['@typescript-eslint'],
    root: true,
    env: { node: true, es6: true },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    rules: {
        'vue/no-v-for-template-key-on-child': 'off'
    }
}
