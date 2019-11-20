module.exports = {
    extends: ['@nekohack/eslint-config', 'plugin:vue/recommended'],
    plugins: [
        '@typescript-eslint',
        'vue'
    ],
    root: true,
    env: { node: true, es6: true },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    }
}
