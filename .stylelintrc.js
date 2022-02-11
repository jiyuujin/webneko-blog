module.exports = {
  extends: ['@nekohack/stylelint-config'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.css', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use'],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'value-list-comma-newline-after': null, // Prettier と競合するため
    'declaration-block-no-duplicate-properties': null,
    'declaration-colon-newline-after': null,
    'declaration-no-important': null,
    'no-empty-source': null,
    'no-invalid-position-at-import-rule': null,
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
  },
}
