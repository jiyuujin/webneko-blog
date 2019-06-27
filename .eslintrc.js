module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    'no-undef': 'error',
    'typeof': false,
    'strictFunctionTypes': false,
    'no-unused-vars': 'off'
  }
}
